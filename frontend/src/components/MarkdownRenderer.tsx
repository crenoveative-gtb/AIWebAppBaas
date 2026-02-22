import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from 'react-hot-toast';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied!');
    };
    const normalizedContent = content.replace(/\n{3,}/g, '\n\n').trim();

    return (
        <div className={`markdown-body ${className}`}>
            <ReactMarkdown
                components={{
                    code({ node, className: codeClassName, children, ...props }) {
                        const match = /language-(\w+)/.exec(codeClassName || '');
                        const codeString = String(children).replace(/\n$/, '');

                        if (match) {
                            return (
                                <div className="code-block-wrapper">
                                    <span className="code-lang">{match[1]}</span>
                                    <button
                                        onClick={() => copyCode(codeString)}
                                        className="code-copy-btn"
                                    >
                                        <i className="bi bi-clipboard mr-1"></i>Copy
                                    </button>
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            margin: 0,
                                            padding: '2rem 1rem 1rem',
                                            borderRadius: '0.75rem',
                                            fontSize: '0.8rem',
                                        }}
                                    >
                                        {codeString}
                                    </SyntaxHighlighter>
                                </div>
                            );
                        }

                        return (
                            <code className={codeClassName} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {normalizedContent}
            </ReactMarkdown>
        </div>
    );
}
