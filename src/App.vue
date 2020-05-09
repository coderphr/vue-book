<template>
 <div class="daily">
   <div class="daily-menu">
     <div class="daily-menu-item"
          @click="handleToRecommend"
          :class="{ on :type === 'recommend'}">每日推荐</div>
     <div class="daily-menu-item"
          :class="{ on :type === 'daily'}"
          @click="isShow = !isShow">主题日报</div>
          <ul v-show="isShow">
            <li v-for="item in themes" :key="item.id">
              <a :class="{ on :item.id === themeID && type === 'daily'}"
                  @click="handlerToThen(item.id)">{{item.name}}</a>
            </li>
          </ul>
   </div>
   <div class="daily-list" ref='list'>
     <template v-if="type === 'recommend'">
      <div v-for="item in recommendList">
        <div class="daily-date">{{ formatDay(item.date) }}</div>
        <Item v-for="list in item.stories" :data='list' :key="list.id" @click.native="handleClick(list.id)"></Item>
      </div>
     </template>
     <template v-if="type === 'daily'">
       <Item v-for="item in list" :data="item" :key="item.id" @click.native="handleClick(item.id)"></Item>
     </template>
   </div>
      <daily-article :id="articleId"></daily-article>
 </div>
</template>
<script>
import $ from './network/util'
import Item from './components/item'
import DailyArticle from './components/daily-article'
export default {
  data() {
    return {
      themes:[],
      type:'recommend',
      isShow:false,
      themeID:0,
      recommendList: [],
      list:[],
      dailyTime: null,
      isLoading:false,
      articleId:0
    }
  },
  components:{
    Item,
    DailyArticle
  },
  mounted() {
    this.getThemes();

    //判断是否滚加载更多
    //获取元素
    const $list = this.$refs.list
    //滚动监听
    $list.addEventListener('scroll',() => {
      if(this.type === 'daily' || this.isLoading) return ;
      if($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
        this.dailyTime -= 86400000
        this.getRecommendList()
      }
    })

  },
  methods:{
    //获取主题分类
    getThemes() {
      $.ajax.get('themes').then(data => {
        this.themes = data.others
      })
    },
    //获取主题详细信息
    handlerToThen(id) {
      this.type = 'daily';
      this.themeId = id;
      this.list = [];
      $.ajax.get('theme/' + id).then(res => {
        this.list = res.stories
         .filter(item => item.type !== 1);
      })
    },
    //获取推荐分类
    handleToRecommend() {
      this.type="recommend";
      this.recommendList = [];
      this.dailyTime = $.getTodayTime()
      this.getRecommendList()
    },
    //获取推荐列表
    getRecommendList() {
      this.isLoading = true;
      const prevDay = $.prevDay(this.dailyTime + 86400000);
      $.ajax.get('news/before/'+prevDay).then(res => {
        this.recommendList.push(res)
        this.isLoading = false
      })
    },
    //修改日期
    formatDay(date) {
      let month = date.substr(4,2);
      let day = date.substr(6,2);
      if(month.substr(0,1) === '0') month = month.substr(1,1);
      if(day.substr(0,1) === '0') day = day.substr(1,1);
      return `${month}月${day}日`
    },
    //获取详情页信息
    handleClick(id) {
      this.articleId = id 
    }
  }
}
</script>
<style>

</style>
