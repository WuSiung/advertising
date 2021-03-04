import React, {FC} from 'react';

interface AutomationProps {

}

const Automation: FC<AutomationProps> = (props) => {
  const { children } = props;
  return (
    <div>{children}</div>
  )
}

export default Automation;
