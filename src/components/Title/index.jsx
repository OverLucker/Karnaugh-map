import styles from './styles.scss';


export default CSSModules(({ size='1', children='', className='' }) => {
    const TagName = `h${size}`;
    return <TagName styleName={cn('title', `title_${size}`)} className={className}>{ children }</TagName>
}, styles, { allowMultiple: true })