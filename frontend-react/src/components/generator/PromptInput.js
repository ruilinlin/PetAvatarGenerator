import React, { useState } from 'react';
import { generateImage } from '../../services/api';

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateImage(prompt);
      // 处理生成结果
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="描述您想要生成的宠物形象..."
      />
      <button type="submit" disabled={loading}>
        {loading ? '生成中...' : '开始生成'}
      </button>
    </form>
  );
};

export default PromptInput; 