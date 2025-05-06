import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import 'quill/dist/quill.snow.css';
import { useQuill } from 'react-quilljs';

const Editor = forwardRef(({ value, onChange }, ref) => {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline',],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ align: [] }],
        ['link'],
        ['clean'],
      ],
    },
  });

  // 暴露编辑器实例给父组件
  useImperativeHandle(ref, () => ({
    getEditor: () => quill,
  }));

  // 处理初始值和值变化
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        onChange(quill.root.innerHTML);
      });

      // 设置初始值
      if (value !== quill.root.innerHTML) {
        quill.clipboard.dangerouslyPasteHTML(value || '');
      }
    }
  }, [quill, onChange, value]);

  return <div ref={quillRef} style={{ height: '234px' }} />;
});

Editor.displayName = 'Editor'; // 为调试目的设置显示名称

export default Editor;