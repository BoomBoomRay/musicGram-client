export default {
  palette: {
    primary: {
      light: '#fffd61',
      main: '#ffca28',
      dark: '#c79a00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff',
    },
  },
  form: {
    formContainer: { textAlign: 'center' },
    imgLogo: { width: 40, margin: '20px auto 20px auto' },
    pageTitle: { margin: '10px auto 10px auto' },
    textField: { margin: '10px' },
    button: {
      marginTop: 20,
      marginBottom: 20,
      position: 'relative',
      width: '77px',
      height: '33px',
    },
    customError: { color: 'red', fontSize: '0.8rem', marginTop: 10 },
    progress: { position: 'absolute' },
  },
  profile: {
    paper: {
      padding: 20,
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        marginTop: 10,
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#ffca28',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
};
