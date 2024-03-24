import{_ as e,r as i,o as l,c,a as n,b as s,d as t,e as d}from"./app-def54fd2.js";const o={},p=n("h1",{id:"二级评论设计",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#二级评论设计","aria-hidden":"true"},"#"),s(" 二级评论设计")],-1),v={href:"https://github.com/lizhifuabc/tomato-platform/tree/main/tomato-framework/tomato-business/tomato-business-comment",target:"_blank",rel:"noopener noreferrer"},m=d(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function r(u,k){const a=i("ExternalLinkIcon");return l(),c("div",null,[p,n("p",null,[s("源码位置："),n("a",v,[s("tomato-platform/tomato-framework/tomato-business/tomato-business-comment at main · lizhifuabc/tomato-platform (github.com)"),t(a)])]),m])}const y=e(o,[["render",r],["__file","二级评论设计.html.vue"]]);export{y as default};
