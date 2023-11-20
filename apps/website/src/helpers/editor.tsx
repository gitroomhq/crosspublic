import { Editor as NovelEditor } from "novel";
import { Markdown } from "tiptap-markdown";
import { lowlight } from 'lowlight/lib/core'
import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight";

import {ReactNodeViewRenderer} from "@tiptap/react";
import CodeBlockComponent from "@meetqa/website/src/helpers/code.block.component";
import dynamic from "next/dynamic";
import {FC} from "react";
const LoadAllLanguages = dynamic(() => import("@meetqa/website/src/helpers/load.all"), { ssr: false });

const block = CodeBlockLowlight
  .extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent)
    },
  })
  .configure({
  lowlight,
  languageClassPrefix: 'language-',
});

export const Editor: FC<{value: string, setValue: (val: string) => void}> = (props) => {
  const {value, setValue} = props;
  return (
      <LoadAllLanguages>
        <NovelEditor
            className="overflow-hidden novel-relative novel-min-h-[500px] novel-w-full novel-border-stone-200 novel-bg-white sm:novel-rounded-lg sm:novel-border sm:novel-shadow-lg"
            defaultValue={value}
            disableLocalStorage={true}
            onDebouncedUpdate={(e) => {
                const mark = e?.storage?.markdown?.getMarkdown()!;
                setValue(mark);
            }}
            extensions={[
              block,
              Markdown.configure({
                html: false,
                transformCopiedText: true,
                transformPastedText: true,
              })
            ]}
            onUpdate={(e) => {
                const currentContent = JSON.stringify(e?.getJSON());
                if (currentContent.indexOf('+') > -1) {
                    const currentSelection = e?.state.selection;
                    const newContent = JSON.parse(currentContent.replace('+', '＋'));
                    e?.chain().setContent(newContent!).run();
                    e?.commands.setTextSelection(currentSelection!);
                }
            }}
        />
      </LoadAllLanguages>
  );
}
