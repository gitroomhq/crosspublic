import Container from "../../components/Container";
import Card from "../../components/Card";
import Button from "../../components/Button";
import React from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import * as process from "process";

export const dynamic = 'force-dynamic';

export default function Page() {
    const headersList = cookies();
    if (headersList.get('auth')) {
        return redirect(process.env.FRONTEND_URL!);
    }

    return (
        <>
            <div className="flex-1 pt-40">
                <Container>
                    <div className="mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3 text-center">
                        <Card>
                            <div>Add the discord bot to your server</div>
                            <div className="pointer relative flex flex-col">
                                <Button
                                    Element="a"
                                    emphasis="secondary"
                                    label={<div className="flex items-center gap-3 justify-center"><img className="w-[30px] h-[30px] -ml-[30px]" src="/images/discord.svg" /><div>Add Discord Bot</div></div>}
                                    to={`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT}&permissions=1084748200000&scope=bot`}
                                    ui="max"
                                />
                            </div>
                            <div>Run <strong>/signin</strong> from the chat</div>
                        </Card>
                    </div>
                </Container>
            </div>
        </>
    );
}
