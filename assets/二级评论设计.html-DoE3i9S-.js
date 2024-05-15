import{_ as e,r as i,o as l,c,b as n,e as s,d as t,a as d}from"./app-oJgUVX7T.js";const o={},m=n("h1",{id:"二级评论设计",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#二级评论设计"},[n("span",null,"二级评论设计")])],-1),p={href:"https://github.com/lizhifuabc/tomato-platform/tree/main/tomato-framework/tomato-business/tomato-business-comment",target:"_blank",rel:"noopener noreferrer"},v=d(`<div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 二级评论
 *
 * <span class="token keyword">@author</span> lizhifu
 * <span class="token keyword">@since</span> 2023/9/5
 */</span>
<span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommentChild</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 条目id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> itemId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 一级评论id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> parentId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 被回复的评论id（null 回复父级评论，有则是回复 replyId 的评论）
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> replyId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 评论人id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 内容
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 点赞数
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> likeCount<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 是否为发布者
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> isPublisher<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 是否删除
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> isDelete<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalTime</span> createTime<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 一级评论
 *
 * <span class="token keyword">@author</span> lizhifu
 * <span class="token keyword">@since</span> 2023/9/5
 */</span>
<span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommentParent</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 条目id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> itemId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 用户id
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> userId<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 内容
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> content<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 点赞数
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> likeCount<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 是否为发布者
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> isPublisher<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 是否删除
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> isDelete<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 创建时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalTime</span> createTime<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function r(u,b){const a=i("ExternalLinkIcon");return l(),c("div",null,[m,n("p",null,[s("源码位置："),n("a",p,[s("tomato-platform/tomato-framework/tomato-business/tomato-business-comment at main · lizhifuabc/tomato-platform (github.com)"),t(a)])]),v])}const y=e(o,[["render",r],["__file","二级评论设计.html.vue"]]),w=JSON.parse('{"path":"/design/business/%E4%BA%8C%E7%BA%A7%E8%AF%84%E8%AE%BA%E8%AE%BE%E8%AE%A1.html","title":"二级评论设计","lang":"zh-CN","frontmatter":{},"headers":[],"git":{"updatedTime":1693904827000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"design/business/二级评论设计.md"}');export{y as comp,w as data};
