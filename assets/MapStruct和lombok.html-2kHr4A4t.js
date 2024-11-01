import{_ as l,r as s,o as n,c,b as t,e as o,d as e,a as r}from"./app-oJgUVX7T.js";const p="/assets/image-20230906204952982-DU4D1azr.png",m="/assets/image-20230906205656346-aHJ4_vnE.png",i="/assets/image-20230906210052728-BIYfZsrc.png",u="/assets/image-20230906202953156-B-F4ntzn.png",b={},h=t("h1",{id:"mapstruct和lombok",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#mapstruct和lombok"},[t("span",null,"MapStruct和lombok")])],-1),k=t("p",null,"项目地址： https://github.com/mapstruct/mapstruct",-1),_=t("p",null,"示例代码位置：",-1),d={href:"https://github.com/lizhifuabc/spring-learn/tree/main/spring-boot-mapstruct",target:"_blank",rel:"noopener noreferrer"},g=r('<h2 id="正常使用-lombok" tabindex="-1"><a class="header-anchor" href="#正常使用-lombok"><span>正常使用 lombok</span></a></h2><p><img src="'+p+'" alt="image-20230906204952982"></p><h2 id="使用-mapstruct" tabindex="-1"><a class="header-anchor" href="#使用-mapstruct"><span>使用 MapStruct</span></a></h2><p><img src="'+m+'" alt="image-20230906205656346"></p><h2 id="单纯-pom-引入-mapstruct-和-lombok" tabindex="-1"><a class="header-anchor" href="#单纯-pom-引入-mapstruct-和-lombok"><span>单纯 pom 引入 MapStruct 和 lombok</span></a></h2><p><img src="'+i+'" alt="image-20230906210052728"></p><h2 id="冲突原因" tabindex="-1"><a class="header-anchor" href="#冲突原因"><span>冲突原因</span></a></h2>',7),S={href:"https://mapstruct.org/faq/#Can-I-use-MapStruct-together-with-Project-Lombok",target:"_blank",rel:"noopener noreferrer"},M=t("p",null,[t("img",{src:u,alt:"image-20230906202953156"})],-1),f=t("p",null,"我可以将MapStruct与Project Lombok一起使用吗？",-1),L=t("p",null,"是，自MapStruct 1.2.0.Beta1和Lombok 1.16.14起。",-1),x=t("p",null,"Lombok是一个注解处理器，它可以（除了其他事情之外）在编译后的bean类的AST（抽象语法树）中添加getter和setter方法。Java注解处理API无法预见AST的修改，因此Lombok和MapStruct需要一些技巧来使它们一起工作。基本上，MapStruct会等待Lombok完成所有的修改，然后再为增强的bean生成映射器类。",-1),v={href:"https://github.com/mapstruct/mapstruct-examples/tree/main/mapstruct-lombok",target:"_blank",rel:"noopener noreferrer"},B=t("p",null,"如果你使用的是Lombok 1.18.16或更新的版本，你还需要添加lombok-mapstruct-binding，以使Lombok和MapStruct一起工作。",-1),z=t("p",null,"如果你使用的是较旧版本的MapStruct或Lombok，解决方案是将由Lombok修改的JavaBeans和由MapStruct处理的映射器接口放在项目的两个单独模块中。然后，在第一个模块的编译过程中运行Lombok，导致在第二个模块的编译过程中运行MapStruct时bean类已经完成。",-1),N=r('<ol><li>字节码增强导致的冲突MapStruct 和 Lombok 都会通过字节码增强的方式为类添加新的代码逻辑。如果增强逻辑顺序不当,会导致冲突。</li><li>访问修饰符处理不同Lombok 会修改类、方法的访问修饰符,而 MapStruct 生成的代码需要按原有的访问修饰符执行。这会产生冲突。</li><li>注解处理顺序异常两者都需要处理注解,如果处理顺序不正确,会导致注解被覆盖从而引发问题。</li><li>默认构造函数处理不一致 Lombok 会生成默认构造函数,而 MapStruct 需要按原有的构造函数生成代码。这会产生冲突。</li><li>对静态方法的处理差异两者在处理静态方法时,生成代码的方式会有差异,从而导致冲突。</li></ol><h2 id="解析" tabindex="-1"><a class="header-anchor" href="#解析"><span>解析</span></a></h2><p>lombok-mapstruct-binding 的作用：</p><p>主要功能是:</p><ol><li>调整 MapStruct 和 Lombok 的字节码增强顺序,使其不再发生冲突。</li><li>将 MapStruct 的代码生成顺序放在 Lombok 之后,以确保 Lombok 的修改可见。</li><li>为 MapStruct 生成的代码添加必要的 Lombok 注解,保证一致性。</li><li>处理访问修饰符、构造函数等可能的差异,减少冲突。</li><li>提供了额外的注解,用于标注需要特殊处理的类和属性。</li></ol><p>通过使用 lombok-mapstruct-binding,可以 peaceful 地在一个项目中同时使用 MapStruct 和 Lombok,而不会出现冲突问题。它探测项目的依赖变化,自动调整 MapStruct 和 Lombok 的字节码增强顺序,从而实现冲突消除。</p>',6);function A(E,I){const a=s("ExternalLinkIcon");return n(),c("div",null,[h,k,_,t("p",null,[t("a",d,[o("spring-learn/spring-boot-mapstruct at main · lizhifuabc/spring-learn (github.com)"),e(a)])]),g,t("p",null,[o("摘自官网："),t("a",S,[o("Frequently Asked Questions (FAQ) – MapStruct"),e(a)])]),M,t("blockquote",null,[f,L,x,t("p",null,[o("这里有一个将这两个项目一起使用的例子。"),t("a",v,[o("mapstruct-examples/mapstruct-lombok at main · mapstruct/mapstruct-examples (github.com)"),e(a)])]),B,z]),N])}const C=l(b,[["render",A],["__file","MapStruct和lombok.html.vue"]]),J=JSON.parse('{"path":"/java/opensource/MapStruct%E5%92%8Clombok.html","title":"MapStruct和lombok","lang":"zh-CN","frontmatter":{},"headers":[{"level":2,"title":"正常使用 lombok","slug":"正常使用-lombok","link":"#正常使用-lombok","children":[]},{"level":2,"title":"使用 MapStruct","slug":"使用-mapstruct","link":"#使用-mapstruct","children":[]},{"level":2,"title":"单纯 pom 引入 MapStruct 和 lombok","slug":"单纯-pom-引入-mapstruct-和-lombok","link":"#单纯-pom-引入-mapstruct-和-lombok","children":[]},{"level":2,"title":"冲突原因","slug":"冲突原因","link":"#冲突原因","children":[]},{"level":2,"title":"解析","slug":"解析","link":"#解析","children":[]}],"git":{"updatedTime":1694006923000,"contributors":[{"name":"拔土豆的程序员","email":"lizhifuabc@163.com","commits":1}]},"filePathRelative":"java/opensource/MapStruct和lombok.md"}');export{C as comp,J as data};
