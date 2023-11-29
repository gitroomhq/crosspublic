import {FC} from "react";
import Markdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {Block} from "@meetfaq/panel/src/components/utils/block";

function convertImageLinksToImgTags(text: string) {
  // Regular expression to match image URLs (including those with query strings)
  // This pattern will match most common image formats like .jpg, .png, .gif, etc., and allows for query strings
  const imageUrlPattern = /https?:\/\/\S+\.(jpg|jpeg|png|gif)(\?\S*)?/gi;

  // Replace the image URLs with <img> tags
  return text.replace(imageUrlPattern, '![alt]($&)');
}


export const MessagesComponent: FC<{messagesList: any[], changeRow: (message: any) => () => void}> = (props) => {
    const {messagesList, changeRow} = props;
    return (
        <Block>
            <div className="space-y-4 bg-white text-black dark:bg-gray-800 dark:text-white max-w-[400px]">
                <div>
                    <strong>Delete irrelevant messages:</strong>
                </div>
                {Array.from(messagesList as any[]).map((message: any) => (
                    <div className={`flex space-x-2`} key={message?.name}>
                        <div className="pt-1" onClick={changeRow(message)}>
                            <div className={`cursor-pointer w-4 h-4 bg-red-600 rounded-full text-sm text-white flex justify-center items-center pb-[2px] ${message.deleted ? 'bg-green-700' : ''}`}>
                                {message.deleted ? '+' : 'x'}
                            </div>
                        </div>
                        <div className={`text-sm ${message.deleted ? 'opacity-30' : ''}`}>
                            <div className="font-medium text-[#412AFB] dark:text-[#412AFB]">
                                {message?.name}
                            </div>
                            <div className="text-xs">
                                <Markdown
                                    children={convertImageLinksToImgTags(message?.message! as string)}
                                    components={{
                                        code(props) {
                                            const {children, className, node, ...rest} = props
                                            const match = /language-(\w+)/.exec(className || '')
                                            return match ? (
                                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                // @ts-ignore
                                                <SyntaxHighlighter
                                                    {...rest}
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={oneLight}
                                                    language={match[1]}
                                                    PreTag="div"
                                                />
                                            ) : (
                                                <code {...rest} className={className}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Block>
    )
}
