/* eslint-disable */
export default function xmlToJson(xml) {
  // Create the return object
  let obj = {};

  if (xml.nodeType == 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        // my browser gives warnings about using nodeValue on attributes, saying that
        //	using it is deprecated.  I've wrapped it in a try..catch and left the
        //	nodeValue usage inside the fallback.
        try {
          obj[attribute.nodeName.toLowerCase()] = attribute.value;
        } catch(err) {
          obj[attribute.nodeName.toLowerCase()] = attribute.nodeValue;
        }
      }
    }
  } else if (xml.nodeType == 3 || xml.nodeType == 4) { // text or cdata
    obj = xml.nodeValue;
  }

  // do children
  if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      let item = xml.childNodes.item(i);
      let nodeName = item.nodeName.toLowerCase();

      // instead of weird object member names that start with #, rename to something nice and dandy
      if (nodeName == '#text')
        {nodeName = 'nodeValue';}
      else if (nodeName == '#cdata-section')
        {nodeName = 'cdataValue';}

      if (typeof (obj[nodeName]) === 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) === 'undefined') {
          let old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  // check if the nodeValue exists, and if so, if it is an array join it to make it a string and strip
  //	leading and trailing whitespace.
  if (obj.nodeValue) {
    if (obj.nodeValue instanceof Array) {
      obj.nodeValue = obj.nodeValue.join('');
    }
    obj.nodeValue = obj.nodeValue.trim();	// node value gets a trim.  note that cdata does not.
    // iterate through properties to see if the nodeValue is the only thing here.  if so, move the value
    //	up a level
    let onlyNV = true;
    for (i in obj) {
      if (i != 'nodeValue') {
        onlyNV = false;
      }
    }
    if (onlyNV) {
      obj = obj.nodeValue;
    }
  }
  if (obj.cdataValue) {
    if (obj.cdataValue instanceof Array) {
      obj.cdataValue = obj.cdataValue.join('');
    }
    // iterate through properties to see if the cdataValue is the only thing here.  if so, move the value
    //	up a level
    let onlyCD = true;
    for (i in obj) {
      if (i != 'cdataValue') {
        onlyCD = false;
      }
    }
    if (onlyCD) {
      obj = obj.cdataValue;
    }
  }

  return obj;
}
