import {FC, ReactNode} from "react";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";
import {UserContext} from "@meetqa/website/src/helpers/user.context";
import Image from "next/image";
import {FetchContext} from "@meetqa/website/src/helpers/fetch.context";
// import {SettingsIcon} from "@meetqa/website/src/components/icons/settings.icon";
// import {BellIcon} from "@meetqa/website/src/components/icons/bell.icon";
import {UserComponent} from "@meetqa/website/src/components/user/user.component";
import {SideMenu} from "@meetqa/website/src/components/layout/side.menu";
import {clsx} from "clsx";
import dynamic from "next/dynamic";
import {Title, TitleProvider} from "@meetqa/website/src/helpers/title.helper";
import {NiceModalProvider} from "@meetqa/website/src/components/utils/nice.modal.provider";
import {Toaster} from "@meetqa/website/src/components/layout/toaster";

const LayoutLoad = dynamic(() => import('@meetqa/website/src/components/layout/layout.load'), { ssr: false });

export const LayoutComponent: FC<{children: ReactNode, user: UserInterface, className: string, flex?: 'flex-col' | 'flex-row'}> = (props) => {
  const {children, user, flex, className} = props;
  return (
      <html lang="en">
        <body>
          <UserContext user={user}>
            <FetchContext>
              <TitleProvider>
                <NiceModalProvider>
                  <LayoutLoad />
                  <Toaster />
                  <div className={clsx("min-h-screen flex", className)}>
                    <div className="min-h-full flex min-w-[85px] bg-primary flex-col gap-[34px]">
                      <div className="flex items-center flex-col w-full mt-[25px]">
                        <Image src="/logobot.png" alt="logo" width={40} height={40} />
                      </div>
                      <SideMenu />
                    </div>
                    <div className="min-h-full flex-1 px-[50px] flex justify-center">
                      <div className="max-w-[1530px] w-full flex flex-col">
                        <div className="h-[74px] w-full flex items-center gap-[32px]">
                          <div className="text-secondary text-main font-main flex-1">
                            <Title />
                          </div>
                          {/*<div>*/}
                          {/*  <SettingsIcon />*/}
                          {/*</div>*/}
                          {/*<div>*/}
                          {/*  <BellIcon />*/}
                          {/*</div>*/}
                          <div className="w-[1px] bg-line h-[24px]" />
                          <div>
                            <UserComponent />
                          </div>
                        </div>
                        <div className={clsx("gap-[20px] w-full flex pb-[20px]", flex || 'flex-col')}>
                          {children}
                        </div>
                      </div>
                    </div>
                  </div>
                </NiceModalProvider>
              </TitleProvider>
            </FetchContext>
        </UserContext>
      </body>
    </html>
  )
}
