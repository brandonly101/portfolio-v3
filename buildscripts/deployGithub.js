const ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'master',
        repo: 'git@github.com:brandonly101/brandonly101.github.io.git',
    },
    () => {
        console.log('Deploy Complete')
    }
);
