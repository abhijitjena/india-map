import '../styles/index.css'

interface IProps {
  toolTipText: string;
  style: React.CSSProperties;
}

const Popover = (props: IProps): React.ReactElement => {
  const { toolTipText, style } = props;
  return (
    <div className="tooltip" style={style}>
      <span className="tooltiptext">{toolTipText}</span>
    </div>
  )
}

export default Popover;