import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .max(80),
      street: Yup.string()
        .required()
        .max(200),
      number: Yup.string(),
      complement: Yup.string().max(200),
      state: Yup.string()
        .required()
        .max(2),
      postal_code: Yup.string().max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .max(80),
      street: Yup.string()
        .required()
        .max(200),
      number: Yup.string(),
      complement: Yup.string().max(200),
      state: Yup.string()
        .required()
        .min(2)
        .max(2),
      postal_code: Yup.string().max(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'ID is required.' });
    }

    const recipient = Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient does not exists' });
    }

    const updatedRecipient = await (await recipient).update(req.body);

    return res.status(200).json(updatedRecipient);
  }
}

export default new RecipientController();
