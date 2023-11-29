import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import languages from 'highlight.js';

export default ({node, updateAttributes }) => {
  const {attrs: { language: defaultLanguage }} = node;
  return (
    <NodeViewWrapper className="code-block">
      <select
        className="relative z-10"
        contentEditable={false}
        defaultValue={defaultLanguage}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onChange={event => {
          event.stopPropagation();
          event.preventDefault();
          updateAttributes({ language: event.target.value });
      }}>
        <option value="null">
          auto
        </option>
        <option disabled>
          —
        </option>
        {languages.listLanguages().map((lang: any, index: any) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre className="novel-rounded-sm novel-bg-stone-100 novel-p-5 novel-font-mono novel-font-medium novel-text-stone-800">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
