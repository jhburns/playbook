/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
  return `${siteConfig.baseUrl}img/${img}`;
}

function docUrl(doc, language) {
  return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? `${language}/` : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);


const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

// TODO: Replace 'help'
class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('get-started', language)}>Get Started</Button>
            <Button href={docUrl('what-is-this', language)}>What Is This?</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const BlockBottom = props => (
  <Container
    padding={['bottom']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const BlockTop = props => (
  <Container
    padding={['top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

// TODO: replace 'help' with appropriate blog article
const Features = () => (
  <BlockBottom layout="fourColumn">
    {[
      {
        content: '[Start communicating](/docs/connect-intro) with other members through Slack and more.',
        image: imgUrl('connect.png'),
        imageAlign: 'top',
        imageLink: siteConfig.baseUrl + 'docs/connect-intro',
        title: 'Connect',
      },
      {
        content: '[Learn](/docs/ux-intro) about user experience principles and why it matters.',
        image: imgUrl('ux.png'),
        imageAlign: 'top',
        imageLink: siteConfig.baseUrl + 'docs/ux-intro',
        title: 'User Experience',
      },
    ]}
  </BlockBottom>
);

const FeatureCallout = () => (
  <BlockTop background="light">
    {[
      {
        content: '[Discover](/docs/product-design-sprint) how to design products so that they are most successful.',
        image: imgUrl('design.png'),
        imageAlign: 'left',
        title: 'Design Process',
        imageLink: siteConfig.baseUrl + '',
      },
    ]}
  </BlockTop>
);

const LearnHow = () => (
  <BlockTop>
    {[
      {
        // TODO: investigate why just 'webdev-intro.md' doesn't work let it says it should here https://docusaurus.io/docs/en/doc-markdown
        content: '[Get resources](/docs/webdev-intro) to speed up and simplify the product development process.',
        image: imgUrl('dev.png'),
        imageAlign: 'right',
        imageLink: siteConfig.baseUrl + '',
        title: 'Software Development',
      },
    ]}
  </BlockTop>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }

  const showcase = siteConfig.users.filter(user => user.pinned).map(user => (
    <a href={user.infoLink} key={user.infoLink}>
      <img src={user.image} alt={user.caption} title={user.caption} />
    </a>
  ));

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>Who is Using This?</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    const language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
