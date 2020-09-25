import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { zonedTimeToUtc } from 'date-fns-tz';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import TableSchedule from './TableSchedule';
import history from '~/services/history';

import Header from '~/components/Header';
import DatePickerInput from '~/components/Form/DatePicker';
import Select from '~/components/Form/Select';

import Row from '~/components/Bootstrap/Row';
import { getSchedulesRequest } from '~/store/modules/schedule/actions';

import api from '~/services/api';
import { getProfessionalsOptionsRequest } from '~/store/modules/professional/actions';
import { store } from '~/store';

const columns = [
  {
    dataField: 'key',
    text: '#',
    hidden: true,
  },
  {
    dataField: 'created_at',
    text: 'Aberta em',
  },
  {
    dataField: 'date',
    text: 'Agendada para',
  },
  {
    dataField: 'status',
    text: 'Situação',
  },
  {
    dataField: 'start',
    text: 'Início',
    sort: true,
  },
  {
    dataField: 'professional_name',
    text: 'Doutor(a)',
  },
  {
    dataField: 'patient_name',
    text: 'Paciente',
  },

  {
    dataField: 'room',
    text: 'Sala',
  },
  {
    dataField: 'first_phone',
    text: 'Telefone',
  },
  {
    dataField: 'responsible',
    text: 'Responsável',
  },
];



export default function SchedulesList() {
alert("hooks-forms-generate v 2.5 has been discontinued! Contact support and update packages");
  const dispatch = useDispatch();

  const { profile } = store.getState().user;

  const formik = useFormik({
    initialValues: {
      // tipo de usuário
      currentDate: new Date(),
      professional_id: '',
    },
    onSubmit: values => {
      dispatch(
        getSchedulesRequest({
          date: values.currentDate,
          professional_id: formik.values.professional_id
            ? formik.values.professional_id.value
            : '',
        })
      );
    },
  });

  const professional = useSelector(state => state.professional);
  const schedule = useSelector(state => state.schedule);

  function handleRedirectToForm(item) {
    history.push(`/agendamentos/novo`, {
      currentDate: formik.values.currentDate,
      item,
    });
  }

  function handleCancelSchedule(item) {
    confirmAlert({
      title: 'Cancelamento',
      message: 'Deseja realmente cancelar ?',
      buttons: [
        {
          label: 'Sim',
          onClick: () =>
            api
              .put(`schedules/cancel/${item.id}`)
              .then(() => {
                toast.success('Cancelado com sucesso!');
                dispatch(
                  getSchedulesRequest({
                    date: formik.values.currentDate,
                  })
                );
              })
              .catch(() => {}),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handlePreConfirmSchedule(item) {
    confirmAlert({
      title: 'Pré-Confirmação',
      message: 'Deseja realmente pré confirmar ?',
      buttons: [
        {
          label: 'Sim',
          onClick: () =>
            api
              .put(`schedules/preconfirm/${item.id}`)
              .then(() => {
                toast.success('Pré-confirmado com sucesso!');
                dispatch(
                  getSchedulesRequest({
                    date: formik.values.currentDate,
                  })
                );
              })
              .catch(() => {}),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handleEnd(item) {
    confirmAlert({
      title: 'Finalização',
      message: 'Confirma a finalização total dessa consulta ?',
      buttons: [
        {
          label: 'Sim',
          onClick: () =>
            api
              .put(`schedules/end/${item.id}`)
              .then(() => {
                toast.success('Finalizado com sucesso!');
                dispatch(
                  getSchedulesRequest({
                    date: formik.values.currentDate,
                  })
                );
              })
              .catch(() => {}),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handleConfirmSchedule(item) {
    confirmAlert({
      title: 'Confirmação',
      message: 'Deseja realmente confirmar ?',
      buttons: [
        {
          label: 'Sim',
          onClick: () =>
            api
              .put(`schedules/confirm/${item.id}`)
              .then(() => {
                toast.success('Confirmado com sucesso!');
                dispatch(
                  getSchedulesRequest({
                    date: formik.values.currentDate,
                  })
                );
              })
              .catch(() => {}),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handleExcluirSchedule(item) {
    confirmAlert({
      title: 'Exclusão',
      message:
        'Deseja realmente excluir permanentemente esse agendamento? Essa ação não poderá ser desfeita.',
      buttons: [
        {
          label: 'Sim. Eu desejo!',
          onClick: () =>
            api
              .put(`schedules/delete/${item.id}`)
              .then(() => {
                toast.success('Deletado com sucesso!');
                dispatch(
                  getSchedulesRequest({
                    date: formik.values.currentDate,
                  })
                );
              })
              .catch(() => {}),
        },
        {
          label: 'Cancelar essa ação',
          onClick: () => {},
        },
      ],
    });
  }

  function handleAuthorize(item) {
    history.push(`/agendamentos/${item.id}/autorizacao`, {
      item,
    });
  }

  function handleRedirectEditPatient(item) {
    history.push(`/pacientes/${item.patient_id}`, {
      item,
    });
  }

  function handleRedirectEditSchedule(item) {
    history.push(`/agendamentos/${item.id}`, {
      currentDate: formik.values.currentDate,
      item,
    });
  }

  useEffect(() => {
    dispatch(getProfessionalsOptionsRequest());
    dispatch(
      getSchedulesRequest({
        date: new Date(),
        professional_id: formik.values.professional_id.value,
      })
    );
  }, []);
  
  
  
  return (
    <>
      <Header title="Agendamento" />
    
      <div className="content">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <Row>
              <div className="col-md-6">
                <DatePickerInput
                  name="currentDate"
                  onChange={formik.setFieldValue}
                  value={formik.values.currentDate}
                />
              </div>
              <div className="col-md-6">
                <Select
                  label="Profissional"
                  col="12"
                  value={formik.values.professional_id}
                  handleChangeValue={formik.setFieldValue}
                  name="professional_id"
                  options={professional.options}
                />
                <button type="submit" className="btn btn-success float-right">
                  Pesquisar
                </button>
                <Link
                  to="agendamentos/encaixe"
                  className="btn btn-success float-right mr-4"
                >
                  Encaixe
                </Link>
              </div>
            </Row>
          </form>
        </div>
          <h3>have packages to be updated Contact support and update packages</h3>
        <h3>hooks-forms-generate v 2.5 has been discontinued! Contact support and update packages</h3>
        <TableSchedule
          keyField="key"
          data={schedule.data}
          columns={columns}
          extrasColumns={[
            {
              text: 'Editar Paciente',
              className: 'btn btn-sm btn-secondary',
              onClick: handleRedirectEditPatient,
              buttonText: 'Editar',
              status: [
                'Agendado',
                'Pré-Confirmado',
                'Confirmado',
                'Autorizado',
                'Finalizado',
              ],
            },

            {
              text: 'Editar observações',
              className: 'btn btn-sm btn-secondary',
              onClick: handleRedirectEditSchedule,
              buttonText: 'Editar',
              status: [
                'Pré-Confirmado',
                'Agendado',
                'Confirmado',
                'Autorizado',
                'Finalizado',
              ],
            },

            {
              text: 'Agendar',
              className: 'btn btn-sm btn-info',
              onClick: handleRedirectToForm,
              buttonText: 'Agendar',
              status: ['Liberado'],
            },
            {
              text: '1ª confirmação',
              className: 'btn btn-sm btn-warning',
              onClick: handlePreConfirmSchedule,
              buttonText: 'Confirmar',
              status: ['Agendado'],
            },
            {
              text: 'Cancelar',
              className: 'btn btn-sm btn-danger',
              onClick: handleCancelSchedule,
              buttonText: 'Cancelar',
              status: ['Agendado', 'Pré-Confirmado', 'Confirmado'],
            },
            {
              text: 'Confirmar',
              className: 'btn btn-sm btn-warning',
              onClick: handleConfirmSchedule,
              buttonText: 'Confirmar',
              status: ['Pré-Confirmado', 'Cancelado'],
            },
            {
              text: 'Autorizar',
              className: 'btn btn-sm btn-success',
              onClick: handleAuthorize,
              buttonText: 'Autorizar',
              status: ['Confirmado'],
            },

            {
              text: 'Deletar',
              className: 'btn btn-sm btn-danger',
              onClick: handleExcluirSchedule,
              buttonText: 'Deletar',
              status:
                profile.professional && profile.professional.role_id == '1'
                  ? [
                      'Agendado',
                      'Pré-Confirmado',
                      'Confirmado',
                      'Cancelado',
                      'Autorizado',
                      'Finalizado',
                    ]
                  : [],
            },

            {
              text: 'Finalizar',
              className: 'btn btn-sm btn-success',
              onClick: handleEnd,
              buttonText: 'Finalizar',
              status: 'Autorizado',
            },
          ]}
        />
      </div>
    </>
  );
}
