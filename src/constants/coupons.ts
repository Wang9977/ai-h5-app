import type { Coupon } from '../types'

export const COUPONS: Coupon[] = [
  {
    id: 'c1',
    title: '新人专享券',
    desc: '全场通用，可与会员折扣叠加',
    amount: 30,
    threshold: 199,
    expiry: '有效期：领取后 7 天内有效',
    tag: 'HOT',
    rules: ['限新用户首次领取', '可与会员折扣叠加使用', '单笔订单限用一张', '不与其他满减活动同用'],
    scope: ['服装鞋包', '美妆护肤', '家居日用', '数码配件'],
  },
  {
    id: 'c2',
    title: '限时满减券',
    desc: '服饰/居家/数码专享',
    amount: 60,
    threshold: 399,
    expiry: '有效期：2 月 15 日 23:59 截止',
    rules: ['限指定品类使用', '不可与其他优惠券叠加', '单笔订单限用一张', '退款将回收优惠券'],
    scope: ['服饰', '居家用品', '数码产品'],
  },
  {
    id: 'c3',
    title: '周末加码券',
    desc: '周五至周日可用，部分商品除外',
    amount: 15,
    threshold: 99,
    expiry: '有效期：本周末内使用',
    tag: 'NEW',
    rules: ['仅限周五至周日使用', '部分商品不参与', '可与限时活动叠加', '最终解释权归商家所有'],
    scope: ['部分指定商品'],
  },
]
