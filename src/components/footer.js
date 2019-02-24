// Copyright 2017 Brandon Ly all rights reserved.

// Node package imports.
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Custom imports.
import footerStyles from '../style/footer.module.scss';


export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer-container">
                <div className={footerStyles.footer}>
                    <div className={footerStyles.copyright}>
                        <FontAwesomeIcon icon="copyright" /> 2019 Brandon Ly
                    </div>
                    <div className={footerStyles.contact}>
                        <a href="mailto:brandonly@live.com" target="_blank" className={footerStyles.contactIcon}>
                            <FontAwesomeIcon icon="envelope"/>
                        </a>
                        <a href="https://www.linkedin.com/in/brandon-ly-1a412b73" target="_blank" className={footerStyles.contactIcon}>
                            <FontAwesomeIcon icon={["fab", "linkedin"]}/>
                        </a>
                        <a href="https://www.github.com/brandonly101" target="_blank" className={footerStyles.contactIcon}>
                            <FontAwesomeIcon icon={["fab", "github"]}/>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
