import React from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Custom imports.
import ProjectsData from '../content/home/projects.json';
import projectsStyles from '../style/projects.module.scss';
import '../style/skills.scss';

class ProjectContentInfo extends React.Component {
    render() {
        const projectData = this.props.projectData;

        // Create the project description column.
        let colDescProjects = [];
        for (let a = 0; a < projectData.descList.length; a++) {
            colDescProjects.push(
                <li key={a}>{projectData.descList[a]}</li>
            );
        }
        let colSkills = [];
        for (let a = 0; a < projectData.skills.length; a++) {
            colSkills.push(
                <li key={a} className={projectData.skills[a].shortTitle}>
                    {projectData.skills[a].title}
                </li>
            );
        }

        return (
            <div className={projectsStyles.contentInfo + " " + projectsStyles.otherProject}>
                <div className={projectsStyles.title}>{projectData.title}</div>
                <div className={projectsStyles.subtitle}>
                    {projectData.projectType}
                    <span>{projectData.dateStart} - {projectData.dateEnd}</span></div>
                <div className={projectsStyles.description}>
                    {projectData.description} {projectData.footage.type == "liveSite" ?
                        <a href={projectData.footage.src} className={projectsStyles.liveSite} target="_blank">Live site</a> :
                        null} {projectData.footage.type == "paper" ?
                        <a href={projectData.footage.src} className={projectsStyles.liveSite} target="_blank">Research paper</a> :
                        null} {projectData.src != "" ?
                        <a href={projectData.src} className={projectsStyles.src} target="_blank">Source code</a> :
                        null}
                    <ul>
                        {colDescProjects}
                    </ul>
                </div>
                <div className="skills">
                    <ul>
                        {colSkills}
                    </ul>
                </div>
            </div>
        );
    }
}

export default class Projects extends React.Component {
    constructor(props) {
        super(props);
        let visibleProject = [];
        for (let i = 0; i < 9; i++) {
            visibleProject.push(false);
        }
        this.state = {
            visibleRow: [ false, false, false ],
            visibleProject: visibleProject,
            projectToShow: [ ProjectsData[0], ProjectsData[0], ProjectsData[0] ]
        };
    }

    // Handler for change of state whenever any of the 3x3 grid projects are clicked on.
    handleClick(ptr, row, col) {
        return function(e) {
            e.preventDefault();
            let tempState = ptr.state;

            if (tempState.visibleProject[row * 3 + col]) {
                tempState.visibleProject[row * 3] = false;
                tempState.visibleProject[row * 3 + 1] = false;
                tempState.visibleProject[row * 3 + 2] = false;
            } else {
                tempState.visibleProject[row * 3] = false;
                tempState.visibleProject[row * 3 + 1] = false;
                tempState.visibleProject[row * 3 + 2] = false;
                tempState.visibleProject[row * 3 + col] = true;
                tempState.projectToShow[row] = ProjectsData[row * 3 + col];
            }
            tempState.visibleRow[row] = (
                tempState.visibleProject[row * 3] ||
                tempState.visibleProject[row * 3 + 1] ||
                tempState.visibleProject[row * 3 + 2]
            );

            ptr.setState(tempState);
        }
    }

    render() {
        // Create the three rows of the 3x3 grid of projects, including the description dropdown.
        let projectsGrid = [];
        for (let row = 0; row < 3; row++) {
            let projectsList = [];

            // Create each of the three columns of the 3x3 grid of projects.
            for (let col = 0; col < 3; col++) {
                let image = { backgroundImage: 'url("' + require("../assets/images/projects/" + ProjectsData[row * 3 + col].img) + '")' };
                let projectClassNames = [
                    projectsStyles.box,
                    this.state.visibleProject[row * 3 + col] ? projectsStyles.boxSelected : "",
                    projectsStyles.img
                ].join(' ');
                let project = (
                    <div key={row * 3 + col} className={projectClassNames} style={image} onClick={this.handleClick(this, row, col)}>
                        <div className={projectsStyles.info}>
                            <div className={projectsStyles.title}>{ProjectsData[row * 3 + col].title}</div>
                            <div className={projectsStyles.subtitle}>{ProjectsData[row * 3 + col].projectType}</div>
                            { this.state.visibleProject[row * 3 + col] ?
                                <FontAwesomeIcon icon="angle-up" size="lg"/> :
                                <FontAwesomeIcon icon="angle-down" size="lg"/>
                            }
                        </div>
                    </div>
                );
                projectsList.push(project);
            }
            let projectsRow = <div key={row * 2} className={projectsStyles.grid}>{projectsList}</div>;
            let descriptionClassName = [
                // 'body-content',
                projectsStyles.dropdown,
                this.state.visibleRow[row] ? projectsStyles.dropdownActive : ''
            ].join(' ');

            // Create the project description that will drop down.
            let footage = this.state.projectToShow[row].footage;
            let descriptionRow = (<div key={row * 2 + 1} className={descriptionClassName}>
                <Container>
                    <Row className={projectsStyles.project}>
                        <Col xs={12} md={6}>
                            <div className={projectsStyles.img}>
                                { (footage.type == "embeddedYoutube") ?
                                    <iframe
                                        src={footage.src}
                                        frameBorder={0}
                                        allowFullScreen="allowfullscreen"/> :
                                    <img src={require("../assets/images/projects/" + this.state.projectToShow[row].img)}/>
                                }
                            </div>
                        </Col>
                        <Col xs={12} md={6} className={projectsStyles.content}>
                            <ProjectContentInfo projectData={this.state.projectToShow[row]} />
                        </Col>
                    </Row>
                </Container>
            </div>);

            projectsGrid.push(projectsRow);
            projectsGrid.push(descriptionRow);
        }

        // Create the list of other, smaller projects.
        let projectsOther = [];
        for (let i = 9; i < ProjectsData.length; i++) {
            projectsOther.push(
                <ProjectContentInfo
                    className={projectsStyles.otherProject}
                    projectData={ProjectsData[i]}
                />
            );
        }

        return (
            <div id="projects" className={projectsStyles.projects}>
                <div className={projectsStyles.main}>
                    <Container fluid={true}>
                        <div className={projectsStyles.heading}>Projects</div>
                        <div className={projectsStyles.headingDesc}>
                            A collection of projects that I have worked on from college to now.
                        </div>
                    </Container>
                </div>
                {projectsGrid}
                <div className={projectsStyles.other}>
                    <Container fluid={true}>
                        <div className={projectsStyles.heading}>Other Projects</div>
                        {projectsOther}
                    </Container>
                </div>
            </div>
        );
    }
}