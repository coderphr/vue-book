<template>
  <div class="daily-article">
      <!-- 新闻区域 -->
      <div class="daily-article-title">{{data.title}}</div>
      <div class="daily-article-content" v-html="data.body"></div>

      <!-- 评论区域 -->
      <div class="daily-comments" v-show="comments.length">
          <span>评论{{comments.length}}</span>
          <div class="daily-commet" v-for="item in comments" :key="item.id">
              <div class="daily-comment-avatar">
                  <img :src="item.avatar" alt="">
              </div>
              <div class="daily-comment-content">
                  <div class="daily-comment-name">{{item.author}}</div>
                  <div class="daily-comment-time" v-time="item.time" ></div>
                  <div class="daily-comment-content">{{item.content}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import $ from '../network/util'
import Time from '../assets/js/time'
export default {
    directives:{Time},
    props:{
        id:{
            type:Number,
            default:0
        }
    },
    data() {
        return {
            data:{},
            comments:[]
        }
    },
    methods:{
        getArticleList() {
            $.ajax.get('news/' + this.id).then(res => {
                res.body = res.body
                    .replace(/src="http/g,'src="' + $.imgPath +'http')
                res.body = res.body
                    .replace(/src="https/g,'src="' + $.imgPath +'http')
                this.data = res
                window.scroll(0,0)
                this.getComments()
            })
        },
        getComments() {
            this.comments = [];
            $.ajax.get('story/' +this.id +'/short-comments').then(res => {
                this.comments = res.comments.map(item => {
                    item.avatar = $.imgPath + item.avatar
                    return item
                })
                console.log(this.comments)
            })
        }
    },
    watch:{
        id(val) {
            if(val) this.getArticleList()
        }
    }
}
</script>

<style>

</style>