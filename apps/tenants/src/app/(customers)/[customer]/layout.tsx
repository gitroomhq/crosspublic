import '../../styles.css';
import {Metadata} from "next";
import { Inter } from 'next/font/google'
import {publicRequestFetch} from "@crosspublic/tenants/src/helpers/get.api.key";
import {ClaimThisPageComponent} from "@crosspublic/tenants/src/components/claim/claim.this.page.component";
import {redirect} from "next/navigation";
import {SearchComponent} from "@crosspublic/tenants/src/components/search/search.component";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Home',
    description: '',
}

export const dynamic = 'force-static';

export default async function DashboardLayout({ children, params }: { children: React.ReactNode, params: {customer: string} }) {
  const {redirect: redirectPath, request, tags, id} = await publicRequestFetch(params.customer);
  if (!request) {
    return (
      <html lang="en">
      <body className={inter.className}>
        <ClaimThisPageComponent />
      </body>
      </html>
    );
  }

  if (redirectPath) {
    redirect(redirectPath);
    return <></>;
  }

  const {data} = await request.get('/public/styles', {cache: 'force-cache', next: {tags: [tags]}});
  return (
      <html lang="en">
      <body className={inter.className} style={{backgroundColor: data.backgroundColor}}>
      <div className="min-h-screen flex flex-col">
        <div className="w-full h-[300px] p-10 flex flex-col items-center" style={{backgroundColor: data.topBarColor, color: data.topBarTextColor}}>
            <div className="w-full max-w-[800px] flex flex-col flex-1 justify-between">
                <div>
                  {data.name}
                </div>
                <div className="text-4xl">Advice and answer from the {data.name} team</div>
                <div>
                    <SearchComponent org={id} />
                </div>
            </div>
        </div>
        <div className="p-10 flex justify-center flex-1">
            <div className="w-full max-w-[800px] flex flex-col flex-1">
              <style>{`.secondaryColor { background-color: ${data.pageBlockColor} } .secondaryTextColor: {background-color: ${data.pageTextColor}`}</style>
                {children}
            </div>
        </div>
        <div>
          <div className="p-10 flex justify-center flex-1">
            <div className="w-full max-w-[800px] flex flex-1">
              <div>{data.brandingText}</div>
            </div>
          </div>
        </div>
      </div>
      </body>
      </html>
  )
}
