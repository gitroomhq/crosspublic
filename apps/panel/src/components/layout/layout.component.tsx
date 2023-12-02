import {FC, ReactNode} from "react";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";
import {UserContext} from "@meetfaq/panel/src/helpers/user.context";
import Image from "next/image";
import {FetchContext} from "@meetfaq/panel/src/helpers/fetch.context";
// import {SettingsIcon} from "@meetfaq/panel/src/components/icons/settings.icon";
// import {BellIcon} from "@meetfaq/panel/src/components/icons/bell.icon";
import {UserComponent} from "@meetfaq/panel/src/components/user/user.component";
import {SideMenu} from "@meetfaq/panel/src/components/layout/side.menu";
import {clsx} from "clsx";
import dynamic from "next/dynamic";
import {Title, TitleProvider} from "@meetfaq/panel/src/helpers/title.helper";
import {NiceModalProvider} from "@meetfaq/panel/src/components/utils/nice.modal.provider";
import {Toaster} from "@meetfaq/panel/src/components/layout/toaster";
import {headers} from "next/dist/client/components/headers";
import {TooltipWrapper} from "@meetfaq/panel/src/components/utils/tooltip.wrapper";

const LayoutLoad = dynamic(() => import('@meetfaq/panel/src/components/layout/layout.load'), { ssr: false });

export const LayoutComponent: FC<{children: ReactNode, user: UserInterface, className: string, flex?: 'flex-col' | 'flex-row'}> = (props) => {
  const pricing = Boolean(headers().get('pricing') === 'true');

  const {children, user, flex, className} = props;
  return (
      <html lang="en">
        <body>
          <UserContext user={user} pricing={pricing}>
            <FetchContext>
              <TitleProvider>
                <NiceModalProvider>
                  <TooltipWrapper />
                  <LayoutLoad />
                  <Toaster />
                  <div className={clsx("min-h-screen flex", className)}>
                    <div className="min-h-full flex min-w-[85px] bg-primary flex-col gap-[34px]">
                      <div className="flex items-center flex-col w-full mt-[25px]">
                        <Image src="/logobot.png" alt="logo" width={40} height={40} />
                      </div>
                      <SideMenu pricing={pricing} />
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
