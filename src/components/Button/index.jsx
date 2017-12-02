import styles from './styles.scss';


export default CSSModules(({ children, onClick=()=>{}, className='' }) => (
    <div styleName="button" className={className} onClick={onClick}>{ children }</div>
), styles, {allowMultiple: true})