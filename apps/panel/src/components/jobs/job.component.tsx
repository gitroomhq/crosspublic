"use client";

import {Jobs, Category} from '@prisma/client';
import {MessagesComponent} from "@meetfaq/panel/src/components/messages/messages.component";
import {useCallback, useState} from "react";
import {MessageWizard} from "@meetfaq/panel/src/components/messages/message.wizard";
import {wrapMeta} from "@meetfaq/panel/src/helpers/wrap.meta";

export const JobComponent = wrapMeta<{id: string, messages: Jobs, categories: Category[]}>(({messages, id, categories}) => {
    const [messagesContent, setMessagesContent] = useState(messages.messageContent as any[]);
    const changeRow = useCallback((message: any) => () => {
        setMessagesContent((messagesList: any) => {
            const index = messagesList.indexOf(message);
            return messagesList.map((p: any, curIndex: any) => ({
                ...p,
                deleted: curIndex === index ? !p.deleted : p.deleted
            }));
        });
    }, [messagesContent]);

    return (
        <div className="flex gap-4">
            <MessageWizard id={id} messagesList={messagesContent} categories={categories} />
            <MessagesComponent messagesList={messagesContent} changeRow={changeRow} />
        </div>
    );
});

