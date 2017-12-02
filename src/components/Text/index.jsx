import styles from './styles.scss';


export default CSSModules(({ children='', className='' }) => (
    <div styleName="text" className={className}>{ children }</div>
), styles, {allowMultiple: true})