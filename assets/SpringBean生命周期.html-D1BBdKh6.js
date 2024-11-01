import{_ as e,r as t,o as p,c as i,b as n,e as s,d as o,a as c}from"./app-oJgUVX7T.js";const l="/assets/image-20230907100730042-Chyt6i84.png",u={},r=n("h1",{id:"springbean生命周期",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#springbean生命周期"},[n("span",null,"SpringBean生命周期")])],-1),d={href:"https://github.com/lizhifuabc/spring-learn/tree/main/spring-bean",target:"_blank",rel:"noopener noreferrer"},k=c('<p>SpringBean的生命周期指的是在Spring框架中，一个Bean从被创建到被销毁的整个过程。Spring框架提供了一些生命周期回调方法，可以在Bean的不同阶段执行自定义的逻辑。</p><p>SpringBean的生命周期包括以下阶段：</p><p><img src="'+l+`" alt="image-20230907100730042"></p><ol><li>实例化（Instantiation）：在这个阶段，Spring容器会根据配置文件或注解创建Bean的实例。</li><li>属性注入（Dependency Injection）：在实例化后，Spring容器会通过依赖注入的方式将Bean所需的属性值注入到Bean中。</li><li>初始化（Initialization）：在属性注入完成后，Spring容器会调用Bean的初始化方法。可以通过配置文件或注解指定初始化方法。</li><li>使用（In Use）：初始化完成后，Bean可以被使用了。在这个阶段，Bean可以响应外部的请求，执行相应的业务逻辑。</li><li>销毁（Destruction）：当Bean不再需要时，Spring容器会调用Bean的销毁方法进行清理工作。可以通过配置文件或注解指定销毁方法。 可以通过实现特定的接口或使用注解来定义Bean的初始化方法和销毁方法。常用的接口包括InitializingBean和DisposableBean，常用的注解包括@PostConstruct和@PreDestroy。</li></ol><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringBeanDemo</span> <span class="token keyword">implements</span> <span class="token class-name">InitializingBean</span><span class="token punctuation">,</span> <span class="token class-name">DisposableBean</span><span class="token punctuation">,</span> <span class="token class-name">BeanNameAware</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 构造函数,执行顺序 1
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">SpringBeanDemo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;SpringBeanDemo 构造函数&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * BeanNameAware 接口回调，执行顺序 2
     * <span class="token keyword">@param</span> <span class="token parameter">name</span> beanName
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setBeanName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;SpringBeanDemo setBeanName:{}&quot;</span><span class="token punctuation">,</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 初始化方法，执行顺序 3
     */</span>
    <span class="token annotation punctuation">@PostConstruct</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;SpringBeanDemo init&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * InitializingBean 接口回调，执行顺序 4
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span> 异常
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;SpringBeanDemo afterPropertiesSet&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 销毁方法，执行顺序 1
     */</span>
    <span class="token annotation punctuation">@PreDestroy</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroyMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;SpringBeanDemo destroyMethod&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * DisposableBean 接口回调，执行顺序 2
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span> 异常
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;SpringBeanDemo destroy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyInstantiationAwareBeanPostProcessor</span> <span class="token keyword">implements</span> <span class="token class-name">InstantiationAwareBeanPostProcessor</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 在实例化bean之前执行自定义逻辑
     * <span class="token keyword">@param</span> <span class="token parameter">beanClass</span> beanClass
     * <span class="token keyword">@param</span> <span class="token parameter">beanName</span> beanName
     * <span class="token keyword">@return</span> bean
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessBeforeInstantiation</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> beanClass<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;MyInstantiationAwareBeanPostProcessor 在实例化bean之前执行自定义逻辑：{}，{}&quot;</span><span class="token punctuation">,</span>beanName<span class="token punctuation">,</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 不需要对实例化的Bean进行任何修改或处理。通常情况下，如果没有需要对Bean进行特殊处理的需求，可以直接返回null。</span>
        <span class="token comment">// 在实际应用中，根据具体的需求，也可以根据实际情况返回其他的值，例如返回一个已经实例化的对象，或者返回一个代理对象等。</span>
        <span class="token comment">// 这取决于你想要在实例化Bean之前执行的自定义逻辑以及对Bean的处理需求。</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 在实例化bean之后执行自定义逻辑
     * <span class="token keyword">@param</span> <span class="token parameter">bean</span> bean
     * <span class="token keyword">@param</span> <span class="token parameter">beanName</span> beanName
     * <span class="token keyword">@return</span> 是否继续执行后续的InstantiationAwareBeanPostProcessor
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">postProcessAfterInstantiation</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;MyInstantiationAwareBeanPostProcessor 在实例化bean之后执行自定义逻辑：{}，{}&quot;</span><span class="token punctuation">,</span>beanName<span class="token punctuation">,</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 返回true，表示继续执行后续的InstantiationAwareBeanPostProcessor</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 在设置bean属性之前执行自定义逻辑
     * <span class="token keyword">@param</span> <span class="token parameter">bean</span> bean
     * <span class="token keyword">@param</span> <span class="token parameter">beanName</span> beanName
     * <span class="token keyword">@return</span> bean
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessBeforeInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;MyInstantiationAwareBeanPostProcessor 在设置bean属性之前执行自定义逻辑：{}，{}&quot;</span><span class="token punctuation">,</span>beanName<span class="token punctuation">,</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 在设置bean属性之后执行自定义逻辑
     * <span class="token keyword">@param</span> <span class="token parameter">bean</span> bean
     * <span class="token keyword">@param</span> <span class="token parameter">beanName</span> beanName
     * <span class="token keyword">@return</span> bean
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessAfterInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span><span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;MyInstantiationAwareBeanPostProcessor 在设置bean属性之后执行自定义逻辑：{}，{}&quot;</span><span class="token punctuation">,</span>beanName<span class="token punctuation">,</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>日志分析：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token class-name">MyInstantiationAwareBeanPostProcessor</span> 在实例化bean之前执行自定义逻辑：springBeanDemo
<span class="token class-name">SpringBeanDemo</span> 构造函数
<span class="token class-name">MyInstantiationAwareBeanPostProcessor</span> 在实例化bean之后执行自定义逻辑：springBeanDemo
<span class="token class-name">SpringBeanDemo</span> setBeanName<span class="token operator">:</span>springBeanDemo
<span class="token class-name">MyInstantiationAwareBeanPostProcessor</span> 在设置bean属性之前执行自定义逻辑：springBeanDemo
<span class="token class-name">SpringBeanDemo</span> init
<span class="token class-name">SpringBeanDemo</span> afterPropertiesSet
<span class="token class-name">MyInstantiationAwareBeanPostProcessor</span> 在设置bean属性之后执行自定义逻辑：springBeanDemo
<span class="token class-name">SpringBeanDemo</span> destroyMethod
<span class="token class-name">SpringBeanDemo</span> destroy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实例化-instantiation" tabindex="-1"><a class="header-anchor" href="#实例化-instantiation"><span>实例化（Instantiation）</span></a></h2><p>在Spring框架中，实例化（Instantiation）是指创建Bean实例的过程。当Spring容器启动时，它会根据配置文件或注解的定义，实例化所需的Bean对象。</p><p>实例化过程可以通过以下几种方式进行：</p><ol><li><p>构造函数实例化：通过调用Bean类的构造函数来创建Bean实例。可以使用无参构造函数或带参数的构造函数，Spring容器会根据配置文件或注解中的定义来确定使用哪个构造函数进行实例化。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">UserService</span> <span class="token function">userService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserService</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>静态工厂方法实例化：通过调用Bean类中的静态工厂方法来创建Bean实例。静态工厂方法是在Bean类中定义的一个静态方法，它返回一个Bean实例。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">UserService</span> <span class="token function">userService2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">UserStaticFactory</span><span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserStaticFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UserService</span> <span class="token function">createUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;调用静态工厂方法&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserService</span><span class="token punctuation">(</span><span class="token string">&quot;1234&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>实例工厂方法实例化：通过调用另一个Bean的实例方法来创建Bean实例。实例工厂方法是在另一个Bean类中定义的一个实例方法，它返回一个Bean实例。</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code>    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">UserFactory</span> <span class="token function">userFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">UserFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">UserService</span> <span class="token function">userService3</span><span class="token punctuation">(</span><span class="token class-name">UserFactory</span> userFactory<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> userFactory<span class="token punctuation">.</span><span class="token function">createUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>实例化过程是Spring框架中Bean生命周期的第一个阶段。在实例化完成后，Spring容器将继续进行依赖注入、初始化和销毁等后续操作。实例化过程是Spring框架中创建Bean实例的基础，它为后续的操作提供了Bean对象的基础。</p>`,13);function v(m,b){const a=t("ExternalLinkIcon");return p(),i("div",null,[r,n("p",null,[s("文章源码："),n("a",d,[s("spring-learn/spring-bean at main · lizhifuabc/spring-learn (github.com)"),o(a)])]),k])}const y=e(u,[["render",v],["__file","SpringBean生命周期.html.vue"]]),B=JSON.parse('{"path":"/spring/spring/SpringBean%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.html","title":"SpringBean生命周期","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"实例化（Instantiation）","slug":"实例化-instantiation","link":"#实例化-instantiation","children":[]}],"git":{"updatedTime":1694058353000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"spring/spring/SpringBean生命周期.md"}');export{y as comp,B as data};
