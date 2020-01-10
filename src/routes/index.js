import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Company from '~/pages/Company';
import OpeningHours from '~/pages/OpeningHours';

import PartnershipsList from '~/pages/Partneserships/List';
import PartnershipsForm from '~/pages/Partneserships/Form';

import ProceduresList from '~/pages/Procedures/List';
import ProceduresForm from '~/pages/Procedures/Form';

import ProfessionalForm from '~/pages/Professional/Form';
import ProfessionalList from '~/pages/Professional/List';

import RoomForm from '~/pages/Rooms/Form';
import RoomList from '~/pages/Rooms/List';

import ProfessionalScheduleList from '~/pages/ProfessionalSchedule/List';
import ProfessionalScheduleForm from '~/pages/ProfessionalSchedule/Form';
import ProceduresProfessionals from '~/pages/ProceduresProfessionals';
import Dashboard from '~/pages/Dashboard';
import SchedulesList from '~/pages/Schedule/List';
import IndicationForm from '~/pages/Indications/Form';
import IndicationList from '~/pages/Indications/List';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />

      <Route exact path="/dashboard" component={Dashboard} isPrivate />

      <Route exact path="/empresa" component={Company} isPrivate />
      <Route exact path="/horarios" component={OpeningHours} isPrivate />

      <Route exact path="/convenios" component={PartnershipsList} isPrivate />
      <Route
        exact
        path="/convenios/novo"
        component={PartnershipsForm}
        isPrivate
      />
      <Route
        path="/convenios/:id"
        exact
        component={PartnershipsForm}
        isPrivate
      />

      <Route
        exact
        path="/:id/procedimentos"
        component={ProceduresList}
        isPrivate
      />
      <Route
        exact
        path="/:partnership_id/procedimentos/novo"
        component={ProceduresForm}
        isPrivate
      />
      <Route
        exact
        path="/procedimentos/:id"
        component={ProceduresForm}
        isPrivate
      />

      <Route
        exact
        path="/profissionais"
        component={ProfessionalList}
        isPrivate
      />
      <Route
        exact
        path="/profissionais/novo"
        component={ProfessionalForm}
        isPrivate
      />
      <Route
        exact
        path="/profissionais/:id"
        component={ProfessionalForm}
        isPrivate
      />

      <Route
        exact
        path="/:id/agenda"
        component={ProfessionalScheduleList}
        isPrivate
      />
      <Route
        exact
        path="/:id/agenda/nova"
        component={ProfessionalScheduleForm}
        isPrivate
      />
      <Route
        exact
        path="/:id/agenda/:agenda_id"
        component={ProfessionalScheduleForm}
        isPrivate
      />

      <Route exact path="/salas" component={RoomList} isPrivate />
      <Route exact path="/salas/nova" component={RoomForm} isPrivate />
      <Route exact path="/salas/:id" component={RoomForm} isPrivate />

      <Route
        exact
        path="/:id/procedimentos/alocar"
        component={ProceduresProfessionals}
        isPrivate
      />

      <Route exact path="/agendamentos" component={SchedulesList} isPrivate />

      <Route exact path="/indicacoes" component={IndicationList} isPrivate />
      <Route
        exact
        path="/indicacoes/nova"
        component={IndicationForm}
        isPrivate
      />
      <Route
        exact
        path="/indicacoes/:id"
        component={IndicationForm}
        isPrivate
      />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
