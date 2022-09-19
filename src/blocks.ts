import type grapesjs from 'grapesjs';
import { RequiredPluginOptions } from '.';

export default (editor: grapesjs.Editor, opts: RequiredPluginOptions) => {
  const { block, label, id } = opts;

  if (block) {
    editor.Blocks.add(id, {
      media: `<svg viewBox="0 0 24 24">
        <path d="M22 9c0-.6-.5-1-1.25-1H3.25C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.25 1h17.5c.75 0 1.25-.4 1.25-1V9Zm-1 6H3V9h18v6Z"/><path d="M15 10h5v1h-5zM15 13h5v1h-5zM15 11.5h5v1h-5z"/>
      </svg>`,
      label,
      category: 'Extra',
      select: true,
      content: { type: id },
      ...block,
    });
  }
}
