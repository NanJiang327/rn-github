const GITHUB_URL = 'https://github.com';
const cheerio = require('cheerio');

function removeDefaultAvatarSize(src) {
  /* istanbul ignore if */
  if (!src) {
    return src;
  }
  return src.replace(/\?s=.*$/, '');
}

exports.fetchGithubTrending = async function fetchGithubTrending(url) {
  const data = await fetch(url);
  const $ = cheerio.load(await data.text());

  const result = $('.Box article.Box-row')
    .get()
    // eslint-disable-next-line complexity
    .map((repo) => {
      const $repo = $(repo);
      const title = $repo.find('.h3').text().trim();
      const [username, repoName] = title.split('/').map((v) => v.trim());
      const relativeUrl = $repo.find('.h3').find('a').attr('href');

      const currentPeriodStarsString =
        $repo.find('.float-sm-right').text().trim() ||
        /* istanbul ignore next */ '';

      const builtBy = $repo
        .find('span:contains("Built by")')
        .find('[data-hovercard-type="user"]')
        .map((i, user) => {
          const altString = $(user).children('img').attr('alt');
          const avatarUrl = $(user).children('img').attr('src');
          return {
            username: altString
              ? altString.slice(1)
              : /* istanbul ignore next */ null,
            href: `${GITHUB_URL}${user.attribs.href}`,
            avatar: removeDefaultAvatarSize(avatarUrl),
          };
        })
        .get();
      const colorNode = $repo.find('.repo-language-color');
      const langColor = colorNode.length
        ? colorNode.css('background-color')
        : null;

      const langNode = $repo.find('[itemprop=programmingLanguage]');
      const lang = langNode.length
        ? langNode.text().trim()
        : /* istanbul ignore next */ null;
      return {
        full_name: repoName,
        owner: {
          author_name: username,
        },
        builtBy,
        description: $repo.find('p.my-1').text().trim() || '',
        language: lang,
        languageColor: langColor,
        stargazers_count: parseInt(
          $repo
            .find(".mr-3 svg[aria-label='star']")
            .first()
            .parent()
            .text()
            .trim()
            .replace(',', '') || /* istanbul ignore next */ '0',
          10
        ),
        html_url: `${GITHUB_URL}${relativeUrl}`,
        forks: parseInt(
          $repo
            .find("svg[aria-label='fork']")
            .first()
            .parent()
            .text()
            .trim()
            .replace(',', '') || /* istanbul ignore next */ '0',
          10
        ),
        currentPeriodStars: parseInt(
          currentPeriodStarsString.split(' ')[0].replace(',', '') ||
            /* istanbul ignore next */ '0',
          10
        ),
      };
    });
  return result;
};
