import { Image } from 'antd'
import { randomLenNum } from '@/utils/utils'

export const RandomCode: React.FC<{ random: Number, changeRandom: Function }> = ({ random, changeRandom }) => {
    return (<Image preview={false} src={'/code?randomStr=' + random} onClick={()=>changeRandom(randomLenNum(4, true))}></Image>)
}