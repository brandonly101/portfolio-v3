// Copyright 2017 Brandon Ly all rights reserved.

// Node package imports.
import React from 'react';
import classnames from 'classnames';

class Container extends React.Component {
    render() {
        var addClassName = (this.props.className ? this.props.className : "");
        var classNames = classnames({
            "container": !this.props.fluid,
            "container-fluid": this.props.fluid
        }, addClassName);
        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }
}

class Row extends React.Component {
    render() {
        var classNames = "row " + (this.props.className ? this.props.className : "");
        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }
}

class Col extends React.Component {
    render() {
        // var classNames = "col-" + this.props.num + " " + (this.props.className ? this.props.className : "");
        var sizes = [ "xs", "sm", "md", "lg" ];
        var classNamesObject = {};
        for (var i = 0; i < 4; i++) {
            var size = sizes[i];
            if (this.props[size]) {
                var numCol = this.props[size];
                classNamesObject["col-" + size + "-" + numCol] = true;
            }
        }
        classNamesObject[this.props.className] = this.props.className;
        var classNames = classnames(classNamesObject);
        return (
            <div className={classNames}>
                {this.props.children}
            </div>
        );
    }
}

export {
    Container,
    Row,
    Col
};
