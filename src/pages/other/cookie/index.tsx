import { Card } from 'antd'
import React, { FC } from 'react'
import { SmallTitle } from '../PrivacyPolicy'
import { ArticleDesc, ArticleTitle, FontWeight } from '../terms'

import styles from './index.less'



const Cookie: FC = () => {
    return <Card className={styles.article}>
        <ArticleTitle>Cookie政策</ArticleTitle>
        <ArticleDesc>这是本平台的Cookie政策，可从tanwanai.com访问</ArticleDesc>
        <SmallTitle>什么是Cookie</SmallTitle>
        <ArticleDesc>与几乎所有专业网站一样，此网站使用cookie。这些很小的文件已下载到您的计算机上，以改善您的体验。此页面描述了他们收集哪些信息，我们如何使用它们以及为什么有时需要存储这些cookie。我们还将分享如何防止这些cookie被存储。但是，这可能会降级或“破坏”网站功能的某些元素。</ArticleDesc>
        <SmallTitle>我们如何使用Cookies</SmallTitle>
        <ArticleDesc>我们使用Cookie的原因多种多样，如下所述。不幸的是，在大多数情况下，没有完全禁用其添加到本网站的功能的行业标准选项来禁用cookie。如果您不确定是否需要它们，建议您保留所有cookie，以防它们被用来提供您所使用的服务。</ArticleDesc>
        <SmallTitle>禁用Cookie</SmallTitle>
        <ArticleDesc>您可以通过调整浏览器设置来阻止Cookie的设置（请参阅浏览器帮助以完成此操作）。请注意，禁用Cookie会影响此网站以及您访问的许多其他网站的功能。禁用cookie通常也会导致也禁用本网站的某些功能。因此，建议您不要禁用cookie。</ArticleDesc>
        <SmallTitle>我们设置的Cookie</SmallTitle>
        <SmallTitle>帐户相关的Cookie</SmallTitle>
        <ArticleDesc>如果您在我们这里创建帐户，我们将使用cookie来管理注册过程和常规管理。当您注销时，这些cookie通常将被删除。但是，在某些情况下，他们可能在以后注销后仍然会记住您的网站首选项。</ArticleDesc>
        <SmallTitle>登录相关的Cookie</SmallTitle>
        <ArticleDesc>当您登录时，我们会使用cookie，以便我们可以记住这一事实。这样可以避免您每次访问新页面时都必须登录。这些Cookie通常在您注销时被删除或清除，以确保您只能在登录时访问受限制的功能和区域。</ArticleDesc>
        <SmallTitle>网站偏好设置Cookie</SmallTitle>
        <ArticleDesc>为了向您提供本网站的出色体验，我们提供了一些功能，可以设置您对使用本网站时的运行方式的偏好。为了记住您的首选项，我们需要设置cookie，以便每当您与受首选项影响的页面进行交互时都可以调用此信息。</ArticleDesc>
        <SmallTitle>第三方Cookie</SmallTitle>
        <ArticleDesc>在某些特殊情况下，我们还使用受信任的第三方提供的cookie。以下部分详细介绍了您可能通过此站点遇到的第三方Cookie。</ArticleDesc>
        <ArticleDesc>本网站使用Google Analytics（分析），它是网络上最广泛且受信任的分析解决方案之一，可帮助我们了解您如何使用该网站并发现改善体验的方法。这些Cookie可能会跟踪诸如您在网站上花费了多长时间以及您访问的页面之类的信息。这样，我们可以继续产生引人入胜的内容。</ArticleDesc>
        <ArticleDesc>有关Google Analytics（分析）Cookie的更多信息，请参见Google Analytics（分析）官方页面。</ArticleDesc>
        <ArticleDesc>本网站使用Facebook Pixel。此Cookie由Facebook放置。它使本平台能够衡量，优化和建立Facebook上投放的广告系列的受众。特别是，它使本平台在访问本平台网站和Facebook时可以看到我们的用户如何在设备之间移动，从而通过分析用户查看和浏览了哪些内容，从而确保我们的用户看到本平台的Facebook广告最有可能对此类广告感兴趣。在本平台网站上进行了互动。</ArticleDesc>
        <ArticleDesc>该站点使用内部通讯系统。内部通讯系统使用通过内部通讯系统收集的信息。有关内部通讯系统cookie的更多信息，请参见官方内部通讯系统页面。</ArticleDesc>
        <ArticleDesc>我们会不时测试新功能，并对网站的交付方式进行微妙的更改。当我们仍在测试新功能时，可以使用这些Cookie来确保您在网站上获得一致的体验，同时确保我们了解用户最喜欢的优化。</ArticleDesc>
        <ArticleDesc>在销售产品时，对我们来说很重要的一点是，要了解有多少用户访问我们网站的访问者。这是这些cookie将跟踪的数据类型。这对您很重要，因为这意味着我们可以准确地做出业务预测，从而使我们能够监控广告和产品成本，以确保获得最佳的价格。</ArticleDesc>
        <ArticleDesc>几个合作伙伴代表我们做广告，而会员跟踪cookie则仅使我们能够查看我们的客户是否已通过我们的一个合作伙伴站点来到该站点，以便我们可以适当地记入他们的信用，并在适用的情况下允许我们的会员伙伴提供他们可能会获得的任何奖金为您提供购买的机会。</ArticleDesc>
        <ArticleDesc>我们还在此网站上使用社交媒体按钮和/或插件。这些使您可以通过各种方式与社交网络连接。为了使这些网站能工作，以下社交媒体网站包括：{"{Facebook（Instagram），Twitter}"}将在我们的网站上设置cookie，这些cookie可能会用于增强您在其站点上的个人资料，或出于各自隐私政策中概述的各种目的而对它们所拥有的数据做出贡献。</ArticleDesc>
        <SmallTitle>更多信息</SmallTitle>
        <ArticleDesc>希望这为您澄清了一切。如前所述，如果您不确定是否需要某些内容，通常启用Cookie更为安全，以防Cookie与您在我们网站上使用的功能之一进行交互。</ArticleDesc>
        <ArticleDesc>但是，如果您仍在寻找更多信息，请给我们发送电子邮件至lzyuan1006@gmail.com。</ArticleDesc>
    </Card>
}

export default Cookie