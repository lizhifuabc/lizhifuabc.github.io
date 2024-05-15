import{_ as t,r as e,o as p,c as o,b as n,e as s,d as i,a as c}from"./app-oJgUVX7T.js";const l="/assets/spring-framework-aop-6-DLhHqP55.png",u={},r=n("h1",{id:"spring核心之面向切面编程-aop",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#spring核心之面向切面编程-aop"},[n("span",null,"Spring核心之面向切面编程(AOP)")])],-1),d={href:"https://github.com/lizhifuabc/spring-learn/tree/main/spring-aop",target:"_blank",rel:"noopener noreferrer"},k=c('<p>AOP为Aspect Oriented Programming的缩写，意为：面向切面编程</p><p>Spring 框架通过定义切面, 通过拦截切点实现了不同业务模块的解耦，这个就叫<strong>面向切面编程</strong></p><h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念"><span>基础概念</span></a></h2><ul><li><strong>前置通知（Before advice）</strong>：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）。</li><li><strong>后置通知（After returning advice）</strong>：在某连接点正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。</li><li><strong>异常通知（After throwing advice）</strong>：在方法抛出异常退出时执行的通知。</li><li><strong>最终通知（After (finally) advice）</strong>：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。</li><li><strong>环绕通知（Around Advice）</strong>：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它自己的返回值或抛出异常来结束执行。</li></ul><h2 id="spring-aop和aspectj" tabindex="-1"><a class="header-anchor" href="#spring-aop和aspectj"><span>Spring AOP和AspectJ</span></a></h2><p>AspectJ是一个java实现的AOP框架，它能够对java代码进行AOP编译（一般在编译期进行），让java代码具有AspectJ的AOP功能（当然需要特殊的编译器）。</p><p><strong>动态织入</strong>和<strong>静态织入</strong>：</p><p>动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的，如Java JDK的动态代理(Proxy，底层通过反射实现)或者CGLIB的动态代理(底层通过继承实现)，Spring AOP采用的就是基于运行时增强的代理技术。</p><p>ApectJ采用的就是静态织入的方式。ApectJ主要采用的是编译期织入，在这个期间使用AspectJ的acj编译器(类似javac)把aspect类编译成class字节码后，在java目标类编译时织入，即先编译aspect类再编译目标类。</p><p><img src="'+l+`" alt="img"></p><table><thead><tr><th>Spring AOP</th><th>AspectJ</th></tr></thead><tbody><tr><td>纯 Java 中实现</td><td>使用 Java 编程语言的扩展实现</td></tr><tr><td>不需要单独的编译过程</td><td>除非设置 LTW，否则需要 AspectJ 编译器 (ajc)</td></tr><tr><td>只能使用运行时织入</td><td>运行时织入不可用。支持编译时、编译后和加载时织入</td></tr><tr><td>功能不强-仅支持方法级编织</td><td>更强大 - 可以编织字段、方法、构造函数、静态初始值设定项、最终类/方法等......。</td></tr><tr><td>只能在由 Spring 容器管理的 bean 上实现</td><td>可以在所有域对象上实现</td></tr><tr><td>仅支持方法执行切入点</td><td>支持所有切入点</td></tr><tr><td>代理是由目标对象创建的, 并且切面应用在这些代理上</td><td>在执行应用程序之前 (在运行时) 前, 各方面直接在代码中进行织入</td></tr><tr><td>比 AspectJ 慢多了</td><td>更好的性能</td></tr><tr><td>易于学习和应用</td><td>相对于 Spring AOP 来说更复杂</td></tr></tbody></table><h2 id="spring-aop" tabindex="-1"><a class="header-anchor" href="#spring-aop"><span>Spring AOP</span></a></h2><p>常用配置</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token comment">// 任意公共方法的执行：</span>
execution（<span class="token keyword">public</span> <span class="token operator">*</span> <span class="token operator">*</span>（<span class="token punctuation">.</span><span class="token punctuation">.</span>））

<span class="token comment">// 任何一个名字以“set”开始的方法的执行：</span>
execution（<span class="token operator">*</span> set<span class="token operator">*</span>（<span class="token punctuation">.</span><span class="token punctuation">.</span>））

<span class="token comment">// AccountService接口定义的任意方法的执行：</span>
execution（<span class="token operator">*</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span>AccountService</span><span class="token punctuation">.</span>*（<span class="token punctuation">.</span><span class="token punctuation">.</span>））

<span class="token comment">// 在service包中定义的任意方法的执行：</span>
execution（<span class="token operator">*</span> com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>service<span class="token punctuation">.</span>*<span class="token punctuation">.</span>*（<span class="token punctuation">.</span><span class="token punctuation">.</span>））

<span class="token comment">// 在service包或其子包中定义的任意方法的执行：</span>
execution（<span class="token operator">*</span> com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>service<span class="token punctuation">.</span><span class="token punctuation">.</span>*<span class="token punctuation">.</span>*（<span class="token punctuation">.</span><span class="token punctuation">.</span>））

<span class="token comment">// 在service包中的任意连接点（在Spring AOP中只是方法执行）：</span>
within（com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>service<span class="token punctuation">.</span>*）

<span class="token comment">// 在service包或其子包中的任意连接点（在Spring AOP中只是方法执行）：</span>
within（com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>service<span class="token punctuation">.</span><span class="token punctuation">.</span>*）

<span class="token comment">// 实现了AccountService接口的代理对象的任意连接点 （在Spring AOP中只是方法执行）：</span>
<span class="token keyword">this</span>（<span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span>AccountService</span>）<span class="token comment">// &#39;this&#39;在绑定表单中更加常用</span>

<span class="token comment">// 实现AccountService接口的目标对象的任意连接点 （在Spring AOP中只是方法执行）：</span>
target（<span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>service<span class="token punctuation">.</span></span>AccountService</span>） <span class="token comment">// &#39;target&#39;在绑定表单中更加常用</span>

<span class="token comment">// 任何一个只接受一个参数，并且运行时所传入的参数是Serializable 接口的连接点（在Spring AOP中只是方法执行）</span>
args（<span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span>） <span class="token comment">// &#39;args&#39;在绑定表单中更加常用; 请注意在例子中给出的切入点不同于 execution(* *(java.io.Serializable))： args版本只有在动态运行时候传入参数是Serializable时才匹配，而execution版本在方法签名中声明只有一个 Serializable类型的参数时候匹配。</span>

<span class="token comment">// 目标对象中有一个 @Transactional 注解的任意连接点 （在Spring AOP中只是方法执行）</span>
<span class="token annotation punctuation">@target</span>（<span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>Transactional</span>）<span class="token comment">// &#39;@target&#39;在绑定表单中更加常用</span>

<span class="token comment">// 任何一个目标对象声明的类型有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）：</span>
<span class="token annotation punctuation">@within</span>（<span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>Transactional</span>） <span class="token comment">// &#39;@within&#39;在绑定表单中更加常用</span>

<span class="token comment">// 任何一个执行的方法有一个 @Transactional 注解的连接点 （在Spring AOP中只是方法执行）</span>
<span class="token annotation punctuation">@annotation</span>（<span class="token class-name"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>Transactional</span>） <span class="token comment">// &#39;@annotation&#39;在绑定表单中更加常用</span>

<span class="token comment">// 任何一个只接受一个参数，并且运行时所传入的参数类型具有@Classified 注解的连接点（在Spring AOP中只是方法执行）</span>
<span class="token annotation punctuation">@args</span>（<span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>xyz<span class="token punctuation">.</span>security<span class="token punctuation">.</span></span>Classified</span>） <span class="token comment">// &#39;@args&#39;在绑定表单中更加常用</span>

<span class="token comment">// 任何一个在名为&#39;tradeService&#39;的Spring bean之上的连接点 （在Spring AOP中只是方法执行）</span>
bean（tradeService）

<span class="token comment">// 任何一个在名字匹配通配符表达式&#39;*Service&#39;的Spring bean之上的连接点 （在Spring AOP中只是方法执行）</span>
bean（<span class="token operator">*</span><span class="token class-name">Service</span>）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring 支持如下三个逻辑运算符来组合切入点表达式：</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token operator">&amp;&amp;</span>：要求连接点同时匹配两个切入点表达式
<span class="token operator">||</span>：要求连接点匹配任意个切入点表达式
<span class="token operator">!</span><span class="token operator">:</span>：要求连接点不匹配指定的切入点表达式
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring AOP采用的就是基于运行时增强的代理技术：</p><ol><li><p>接口使用JDK代理</p></li><li><p>非接口使用Cglib代理</p></li></ol><p>Spring 使用了@AspectJ框架为AOP的实现提供了一套注解：</p><table><thead><tr><th>注解名称</th><th>解释</th></tr></thead><tbody><tr><td>@Aspect</td><td>用来定义一个切面。</td></tr><tr><td>@pointcut</td><td>用于定义切入点表达式。在使用时还需要定义一个包含名字和任意参数的方法签名来表示切入点名称，这个方法签名就是一个返回值为void，且方法体为空的普通方法。</td></tr><tr><td>@Before</td><td>用于定义前置通知，相当于BeforeAdvice。在使用时，通常需要指定一个value属性值，该属性值用于指定一个切入点表达式(可以是已有的切入点，也可以直接定义切入点表达式)。</td></tr><tr><td>@AfterReturning</td><td>用于定义后置通知，相当于AfterReturningAdvice。在使用时可以指定pointcut / value和returning属性，其中pointcut / value这两个属性的作用一样，都用于指定切入点表达式。</td></tr><tr><td>@Around</td><td>用于定义环绕通知，相当于MethodInterceptor。在使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。</td></tr><tr><td>@After-Throwing</td><td>用于定义异常通知来处理程序中未处理的异常，相当于ThrowAdvice。在使用时可指定pointcut / value和throwing属性。其中pointcut/value用于指定切入点表达式，而throwing属性值用于指定-一个形参名来表示Advice方法中可定义与此同名的形参，该形参可用于访问目标方法抛出的异常。</td></tr><tr><td>@After</td><td>用于定义最终final 通知，不管是否异常，该通知都会执行。使用时需要指定一个value属性，该属性用于指定该通知被植入的切入点。</td></tr><tr><td>@DeclareParents</td><td>用于定义引介通知，相当于IntroductionInterceptor (不要求掌握)。</td></tr></tbody></table><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>spring<span class="token punctuation">.</span>aop<span class="token punctuation">.</span>aspect</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">lombok<span class="token punctuation">.</span>extern<span class="token punctuation">.</span>slf4j<span class="token punctuation">.</span></span><span class="token class-name">Slf4j</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>aspectj<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span><span class="token class-name">ProceedingJoinPoint</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">EnableAspectJAutoProxy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * LogAspect: 日志切面
 *
 * <span class="token keyword">@author</span> lizhifu
 * <span class="token keyword">@since</span> 2023/9/17
 */</span>
<span class="token annotation punctuation">@EnableAspectJAutoProxy</span>
<span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@Aspect</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LogAspect</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 切入点.
     */</span>
    <span class="token annotation punctuation">@Pointcut</span><span class="token punctuation">(</span><span class="token string">&quot;execution(* com.spring.aop.service.*.*(..))&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">pointCutMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 环绕通知.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">pjp</span> pjp
     * <span class="token keyword">@return</span> obj
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Throwable</span></span> exception
     */</span>
    <span class="token annotation punctuation">@Around</span><span class="token punctuation">(</span><span class="token string">&quot;pointCutMethod()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">doAround</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> pjp<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;---------------------环绕通知: 开始---------------------&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Object</span> o <span class="token operator">=</span> pjp<span class="token punctuation">.</span><span class="token function">proceed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;---------------------环绕通知: 结束---------------------&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> o<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 前置通知.
     */</span>
    <span class="token annotation punctuation">@Before</span><span class="token punctuation">(</span><span class="token string">&quot;pointCutMethod()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doBefore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;前置通知&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token doc-comment comment">/**
     * 后置通知.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">result</span> return val
     */</span>
    <span class="token annotation punctuation">@AfterReturning</span><span class="token punctuation">(</span>pointcut <span class="token operator">=</span> <span class="token string">&quot;pointCutMethod()&quot;</span><span class="token punctuation">,</span> returning <span class="token operator">=</span> <span class="token string">&quot;result&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterReturning</span><span class="token punctuation">(</span><span class="token class-name">String</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;后置通知, 返回值: {}&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 异常通知.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">e</span> exception
     */</span>
    <span class="token annotation punctuation">@AfterThrowing</span><span class="token punctuation">(</span>pointcut <span class="token operator">=</span> <span class="token string">&quot;pointCutMethod()&quot;</span><span class="token punctuation">,</span> throwing <span class="token operator">=</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterThrowing</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;异常通知, 异常: {}&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 最终通知.
     */</span>
    <span class="token annotation punctuation">@After</span><span class="token punctuation">(</span><span class="token string">&quot;pointCutMethod()&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;最终通知&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>https://pdai.tech/md/spring/spring-x-framework-aop.html</p></blockquote>`,23);function v(m,b){const a=e("ExternalLinkIcon");return p(),o("div",null,[r,n("p",null,[s("文章代码："),n("a",d,[s("spring-learn/spring-aop at main · lizhifuabc/spring-learn (github.com)"),i(a)])]),k])}const h=t(u,[["render",v],["__file","Spring核心之面向切面编程(AOP).html.vue"]]),A=JSON.parse('{"path":"/spring/spring/Spring%E6%A0%B8%E5%BF%83%E4%B9%8B%E9%9D%A2%E5%90%91%E5%88%87%E9%9D%A2%E7%BC%96%E7%A8%8B(AOP).html","title":"Spring核心之面向切面编程(AOP)","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"基础概念","slug":"基础概念","link":"#基础概念","children":[]},{"level":2,"title":"Spring AOP和AspectJ","slug":"spring-aop和aspectj","link":"#spring-aop和aspectj","children":[]},{"level":2,"title":"Spring AOP","slug":"spring-aop","link":"#spring-aop","children":[]},{"level":2,"title":"示例","slug":"示例","link":"#示例","children":[]}],"git":{"updatedTime":1697008847000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":3}]},"filePathRelative":"spring/spring/Spring核心之面向切面编程(AOP).md"}');export{h as comp,A as data};
