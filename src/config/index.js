/* set your data here */
const email = 'info@idancer.studio';
const domain = 'idancer.studio'
/* ***************** */

const repository = 'https://github.com/Deamoner/dance.studio';

const messages = {
  app: {
    crash: {
      title: 'Oooops... Sorry, I guess, something went wrong. You can:',
      options: {
        email: `contact with author by this email - ${email}`,
        reset: 'Press here to reset the application',
      },
    },
  },
  images: {
    failed: 'something went wrong during image loading :(',
  },
  404: 'Hey friend? What are you looking for?',
};

const copyright = {
  title: 'copyright © ',
  link: domain,
};

const themes = {
  light: {
    palette: {
      type: 'light',
      background: {
        default: '#fafafa',
        paper: '#fff',
      },
      primary: {
        light: '#7986cb',
        main: '#3f51b5',
        dark: '#303f9f',
        contrastText: '#fff',
      },
    },
  },

  dark: {
    palette: {
      type: 'dark',
      background: {
        default: '#111',
        paper: '#171717',
      },
      primary: {
        light: '#7986cb',
        main: '#333',
        dark: '#303f9f',
        contrastText: '#fff',
      },
    },
  },
};

const cancelationMessage = 'operation is manually canceled';

const dateFormat = 'MMMM DD, YYYY';

const title = 'Dance.studio';

const themePair = ['dark', 'light'];

export {
  messages,
  cancelationMessage,
  dateFormat,
  copyright,
  email,
  domain,
  repository,
  title,
  themePair,
  themes,
};
