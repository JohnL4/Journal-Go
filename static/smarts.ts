var isLight = true;

function lightDarkClick() {
  isLight = ! isLight;
  setStyle( 'theme', `${isLight ? 'light.css' : 'dark.css'}`);
  // window.alert(`Now, is ${isLight ? 'light' : 'dark'}`);
}




/**
 * Set the stylesheet with the specified key.
 */
function setStyle(key: string, href: string) {
  getLinkElementForKey(key).setAttribute("href", href);
}

/**
 * Remove the stylesheet with the specified key.
 */
function removeStyle(key: string) {
  const existingLinkElement = getExistingLinkElementByKey(key);
  if (existingLinkElement) {
    document.head.removeChild(existingLinkElement);
  }
}




function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement("link");
  linkEl.setAttribute("rel", "stylesheet");
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `app-${key}`;
}


// alert( "typescript smarts!");
