export default function formatResponse(responseText: string): string {
  // Replace headings
  responseText = responseText.replace(/^# (.*)$/gm, '<h2>$1</h2>');
  //replace sub headings
  responseText = responseText.replace(/^(\d\.\d) (.*)$/gm, '<h3>$1 $2</h3>');
  // Replace bold text
  responseText = responseText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  // Replace bullet points and create lists
  responseText = responseText.replace(/^\* (.*)$/gm, '<li>$1</li>');
  const listRegex = /(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)+)/gs;
  responseText = responseText.replace(listRegex, '<ul>$&</ul>');
  // Replace code blocks
  responseText = responseText.replace(/```java\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  // Replace line breaks
  responseText = responseText.replace(/\n/g, '<br>');
  //replace & with double line breaks
  responseText = responseText.replace(/&/g, '<br>');

  return responseText;
}