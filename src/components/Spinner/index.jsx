import styles from './styles.scss';


export default CSSModules(({ color='#80be9c', className='' }) => (
    <div styleName="loader">
        <svg width='120px'
             height='120px'
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 100 100"
             preserveAspectRatio="xMidYMid"
             styleName="loader__spinner"
             className={cn(
                 'uil-ring-alt',
                 className
             )}
        >
            <circle cx="50" cy="50" r="40" stroke={ color } fill="none" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502"/>
                <animate attributeName="stroke-dasharray" dur="2.3s" repeatCount="indefinite" values="225.9 25.099999999999994;1 250;225.9 25.099999999999994"/>
            </circle>
        </svg>
    </div>
), styles, {allowMultiple: true})