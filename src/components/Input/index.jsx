import styles from './styles.scss';


export default CSSModules((props) => (
    <input styleName="input" {...props} type="text"/>
), styles, {allowMultiple: true})