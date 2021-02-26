import request from '@/utils/request'
import { AdvPackParam, AdvSetParam, AdvAdvParam, AdvParam} from './data';

export async function qureyAdvPark(params: AdvPackParam){
  return request('/ads/advpack/page2',{
      method: 'get',
      params
  });
}
export async function queryAdvSet(params: AdvSetParam){
    return request('/ads/advset/page2',{
        method: 'get',
        params
    });
}
export async function queryAdvAdv(params: AdvAdvParam){
    return request('/ads/advadv/page2',{
        method: 'get',
        params
    });
}
export async function queryAdvSetForTreeView(params:{packId:number}){
    return request('/ads/advset/page2',{
        method: 'get',
        params
    });
}
export async function queryAdvAdvForTreeView(params:{packId:number}){
    return request('/ads/advadv/page2',{
        method: 'get',
        params
    });
}
export async function advSet(params: AdvParam){
    return request('/ads/advset',{
        method: 'put',
        data:params
    });
}
export async function advPack(params: AdvParam){
    return request('/ads/advpack',{
        method: 'put',
        data:params
    });
}
export async function advAdv(params: AdvParam){
    return request('/ads/advadv',{
        method: 'put',
        data:params
    });
}