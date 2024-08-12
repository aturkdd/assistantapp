import React from 'react';
import CookieConsent from 'react-cookie-consent';
//import { useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  
  return (
    <CookieConsent
      buttonText='accept'
      cookieName="cookieOfAuction"
      style={{ background: '#267e97' }}
      buttonClasses="standardButton"
      enableDeclineButton
      declineButtonText='reject'
      declineButtonClasses="standardButton"
      expires={150}>
      <span style={{ fontSize: '18px',marginRight:'45px' }}> <h3>Denna webbplats använder cookies</h3>
      <p>Vi använder enhetsidentifierare för att anpassa innehållet och annonserna till användarna, tillhandahålla funktioner för sociala medier och analysera vår trafik. Vi vidarebefordrar även sådana identifierare och annan information från din enhet till de sociala medier och annons- och analysföretag som vi samarbetar med. Dessa kan i sin tur kombinera informationen med annan information som du har tillhandahållit eller som de har samlat in när du har använt deras tjänster. </p></span>{' '}
    </CookieConsent>
  );
};

export default CookiePolicy;
