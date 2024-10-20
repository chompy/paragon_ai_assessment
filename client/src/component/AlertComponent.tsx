import { FC, useState } from 'react';

interface AlertProps {
    content: string,
    onReadMore?: CallableFunction,
    onDismiss?: CallableFunction
}  

const AlertComponent: FC<AlertProps> = ({ content, onReadMore, onDismiss }) => {

    const [ isDismissed, setDismissed ] = useState(false);

    const dismiss = () => {
        if (onDismiss) {
            onDismiss();
        }
        setDismissed(true);
    }
    const readMore = () => {
        if (onReadMore) {
            onReadMore();
        }
        setDismissed(true);
    }

    // only render "read more" link
    let readMoreEle = null;
    if (onReadMore) {
        readMoreEle = <div className="alert-readmore"><button onClick={readMore}>Read more.</button></div>
    }

    // once dismissed, stop displaying alert content
    if (isDismissed) {
        return null;
    }

    return (
    <div className="alert feature-alert">
        <div className="alert-content">{content}</div>
        {readMoreEle}
        <div className="alert-options">
            <button onClick={dismiss}>Dismiss</button>
        </div>
    </div>
    );
}

export default AlertComponent;
