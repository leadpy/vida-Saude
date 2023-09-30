import React, { useState, useEffect } from "react";

import { Avatar, CardHeader } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles(theme => ({
	card: {
		paddingTop: theme.spacing(0),
		paddingBottom: theme.spacing(0),
	},
}));

const TicketInfo = ({ contact, ticket, onClick }) => {
	const { user, whatsapp, queue } = ticket
	const [userName, setUserName] = useState('')
	const [contactName, setContactName] = useState('')
	const classes = useStyles();
	useEffect(() => {
		if (contact) {
			setContactName(contact.name);
			if (document.body.offsetWidth < 600) {
				if (contact.name.length > 10) {
					const truncadName = contact.name.substring(0, 10) + '...';
					setContactName(truncadName);
				}
			}
		}

		if (user && contact) {
			setUserName(`${i18n.t("messagesList.header.assignedTo")} ${user.name}`);

			if (document.body.offsetWidth < 600) {
				setUserName(`${user.name}`);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleTitle = () => {
		let fila = "";
		if (queue)
			fila = `| Fila:  ${queue.name} `;
		return `${contactName} #${ticket.id} | Conexão: ${whatsapp.name} ${fila} `
	}

	return (
		<CardHeader
			onClick={onClick}
			style={{ cursor: "pointer" }}
			className={classes.card}
			titleTypographyProps={{ noWrap: true }}
			subheaderTypographyProps={{ noWrap: true }}
			avatar={<Avatar src={contact.profilePicUrl} alt="contact_image" />}
			title={handleTitle()}
			subheader={ticket.user && `${userName}`}
		/>
	);
};

export default TicketInfo;
