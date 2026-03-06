import { useState } from 'react';
import { getTranslation } from '../translations';

function QuestionInput({ onSubmit, language }) {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const t = (key) => getTranslation(language, key);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 验证问题不能为空
    if (!question.trim()) {
      setError(t('questionRequired'));
      return;
    }

    setError('');
    onSubmit(question);
  };

  return (
    <div className="question-input">
      <h2>{t('questionTitle')}</h2>
      <p>{t('questionDescription')}</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            if (error) setError(''); // 清除错误消息当用户开始输入
          }}
          placeholder={t('questionPlaceholder')}
          rows="4"
          className={error ? 'error' : ''}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">{t('questionButton')}</button>
      </form>
    </div>
  );
}

export default QuestionInput;
