import React from 'react';
import { Navigate, Route, Routes, useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeletePlacePopup from './DeletePlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import ProtectedRoute from './ProtectedRoute';
import * as mestoAuth from '../utils/mestoAuth';

function App() {

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isDeletePlacePopupOpen, setIsDeletePlacePopupOpen ] = React.useState(false);
  const [ isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen ] = React.useState(false);

  const [ isRegistrationSuccessful, setIsRegistrationSuccessful ] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ cards, setCards ] = React.useState([]);

  const [ cardToDelete, setCardToDelete ] = React.useState(null);
  const [ selectedCard, setSelectedCard ] = React.useState(null);
  const [ isLoading, setIsLoading ] = React.useState(false);

  const navigate = useNavigate();

  function auth(jwt) {
    return mestoAuth.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          // setUserEmail(res.data.email);
          setUserEmail(res.email);
        }
      })
      .catch(console.error); 
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth(jwt);
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      const jwt = localStorage.getItem('jwt'); ///////////
      api.getUserInfo(jwt) ////////
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(console.error);

      api.getAllCards(jwt)
      .then((cards) => {
        setCards(cards);
      })
      .catch(console.error); 
    }
  }, [loggedIn])
  
  function onLogin({ email, password }) {
    return mestoAuth.authorize(email, password).then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setUserEmail(email);
    });
  };

  function onRegister({ email, password }) {
    return mestoAuth.register(email, password)
    .then((res) => {
        setIsRegistrationSuccessful(true);
        setIsInfoTooltipPopupOpen(true);
    })
  };

  function showRegisterError() {
    setIsRegistrationSuccessful(false);
    setIsInfoTooltipPopupOpen(true);
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  };


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleDeletePlaceClick(card) {
    setIsDeletePlacePopupOpen(true);
    setCardToDelete(card);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsInfoTooltipPopupOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const jwt = localStorage.getItem('jwt');

    if (!isLiked) {
      api.like(card._id, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
    } else {
      api.deleteLike(card._id, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(console.error)
    };
  };

  function handleCardDelete(card) {
    function makeRequest() {
      const jwt = localStorage.getItem('jwt');
      
      return api.deleteCard(card._id, jwt).then(() => setCards((state) => state.filter((c) => c._id !== card._id && c)));
    };

    handleSubmit(makeRequest);
  };

  function handleUpdateUser(data) {
    function makeRequest() {
      const jwt = localStorage.getItem('jwt');
      
      return api.editUserInfo(data, jwt).then(setCurrentUser); //////
    };

    handleSubmit(makeRequest);
  };

  function handleUpdateAvatar(link) {
    function makeRequest() {
      const jwt = localStorage.getItem('jwt');

      return api.updateAvatar(link, jwt).then(setCurrentUser);
    };

    handleSubmit(makeRequest);
  };

  function handleAddPlaceSubmit(newCard) {
    function makeRequest() {
      const jwt = localStorage.getItem('jwt');

      return api.addCard(newCard, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
      });
    };

    handleSubmit(makeRequest);
  };

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">

          <Routes>
            <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn}>  
                <>
                <Header loggedIn={loggedIn} onSignOut={onSignOut} userEmail={userEmail} /> 
                <Main 
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeleteClick={handleDeletePlaceClick}
                  cardToDelete={cardToDelete}
                  cards={cards} 
                />
                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onAddPlace={handleAddPlaceSubmit} />

                <ImagePopup card={selectedCard} />

                <DeletePlacePopup 
                  isOpen={isDeletePlacePopupOpen} 
                  onCardDelete={handleCardDelete} 
                  cardToDelete={cardToDelete} 
                  />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
                </>
              </ProtectedRoute>
            } />

       
            <Route path="/sign-up" element={
              <>
              <Header loggedIn={loggedIn} onSignOut={onSignOut} userEmail={userEmail}>
                <Link to="/sign-in" className="header__nav opacity-transition">Войти</Link>
              </Header>
              <Register onRegister={onRegister} showRegisterError={showRegisterError}/>
              </>
            } />

            <Route path="/sign-in" element={
              <>
              <Header loggedIn={loggedIn} onSignOut={onSignOut} userEmail={userEmail} >
                <Link to="/sign-up" className="header__nav opacity-transition">Регистрация</Link>
              </Header> 
              <Login onLogin={onLogin}/>
              </>
            } />

            <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}/>
          </Routes>

            <InfoTooltip 
              isOpen={isInfoTooltipPopupOpen} 
              isRegistrationSuccessful={isRegistrationSuccessful} 
              successMessage={'Вы успешно зарегистрировались!'}
              errorMessage={'Что-то пошло не так! Попробуйте ещё раз.'}
            />

        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>

  );
}

export default App;