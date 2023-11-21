import showdown from 'showdown';
const converter = new showdown.Converter();

export const textToMarkdown = (text: string) => {
  return converter.makeHtml(text);
}
