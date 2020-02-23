package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the personalidad database table.
 * 
 */
@Entity
@NamedQuery(name="Personalidad.findAll", query="SELECT p FROM Personalidad p")
public class Personalidad implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_PERSONALIDAD")
	private Long idPersonalidad;

	@Column(name="ACATA_NORMAS")
	private String acataNormas;

	@Column(name="ACTITUD_RESPETUOSA")
	private String actitudRespetuosa;

	@Column(name="AUTOESTIMA_VALORACION")
	private String autoestimaValoracion;

	@Column(name="CONTROLA_IMPULSOS")
	private String controlaImpulsos;

	@Column(name="DEMUESTRA_EMPRENDIMIENTO")
	private String demuestraEmprendimiento;

	@Column(name="DISPUESTO_CONCENTRADO")
	private String dispuestoConcentrado;

	@Column(name="HIGIENE_PRESENTACION")
	private String higienePresentacion;

	@Column(name="INTEGRA_GRUPO")
	private String integraGrupo;

	@Column(name="INTERCAMBIA_CONOCIMIENTOS")
	private String intercambiaConocimientos;

	@Lob
	@Column(name="OBSERVACIONES_PRIMER_SEMESTRE")
	private String observacionesPrimerSemestre;

	@Lob
	@Column(name="OBSERVACIONES_SEGUNDO_SEMESTRE")
	private String observacionesSegundoSemestre;

	@Column(name="PARTICIPA_CLASES")
	private String participaClases;

	@Column(name="POSITIVO_PARTICIPATIVO")
	private String positivoParticipativo;

	@Column(name="PREOCUPACION_SOLIDARIDAD")
	private String preocupacionSolidaridad;

	@Column(name="RESPETA_BIENES")
	private String respetaBienes;

	@Column(name="RESPETA_NORMAS_CONVIVENCIA")
	private String respetaNormasConvivencia;

	@Column(name="RESPONSABLE_DEBERES")
	private String responsableDeberes;

	@Column(name="RESUELVE_PROBLEMAS_INTERPERSONALES")
	private String resuelveProblemasInterpersonales;

	@Column(name="SUPERA_DIFICULTADES")
	private String superaDificultades;

	@Column(name="SUPERA_ERRORES")
	private String superaErrores;

	@Column(name="TOLERA_FRUSTRACIONES")
	private String toleraFrustraciones;

	@Column(name="TRABAJA_CLASES")
	private String trabajaClases;

	@Column(name="TRABAJO_CONTINUO")
	private String trabajoContinuo;

	//uni-directional many-to-one association to Alumno
	@ManyToOne
	private Alumno alumno;

	public Personalidad() {
	}

	public Long getIdPersonalidad() {
		return this.idPersonalidad;
	}

	public void setIdPersonalidad(Long idPersonalidad) {
		this.idPersonalidad = idPersonalidad;
	}

	public String getAcataNormas() {
		return this.acataNormas;
	}

	public void setAcataNormas(String acataNormas) {
		this.acataNormas = acataNormas;
	}

	public String getActitudRespetuosa() {
		return this.actitudRespetuosa;
	}

	public void setActitudRespetuosa(String actitudRespetuosa) {
		this.actitudRespetuosa = actitudRespetuosa;
	}

	public String getAutoestimaValoracion() {
		return this.autoestimaValoracion;
	}

	public void setAutoestimaValoracion(String autoestimaValoracion) {
		this.autoestimaValoracion = autoestimaValoracion;
	}

	public String getControlaImpulsos() {
		return this.controlaImpulsos;
	}

	public void setControlaImpulsos(String controlaImpulsos) {
		this.controlaImpulsos = controlaImpulsos;
	}

	public String getDemuestraEmprendimiento() {
		return this.demuestraEmprendimiento;
	}

	public void setDemuestraEmprendimiento(String demuestraEmprendimiento) {
		this.demuestraEmprendimiento = demuestraEmprendimiento;
	}

	public String getDispuestoConcentrado() {
		return this.dispuestoConcentrado;
	}

	public void setDispuestoConcentrado(String dispuestoConcentrado) {
		this.dispuestoConcentrado = dispuestoConcentrado;
	}

	public String getHigienePresentacion() {
		return this.higienePresentacion;
	}

	public void setHigienePresentacion(String higienePresentacion) {
		this.higienePresentacion = higienePresentacion;
	}

	public String getIntegraGrupo() {
		return this.integraGrupo;
	}

	public void setIntegraGrupo(String integraGrupo) {
		this.integraGrupo = integraGrupo;
	}

	public String getIntercambiaConocimientos() {
		return this.intercambiaConocimientos;
	}

	public void setIntercambiaConocimientos(String intercambiaConocimientos) {
		this.intercambiaConocimientos = intercambiaConocimientos;
	}

	public String getObservacionesPrimerSemestre() {
		return this.observacionesPrimerSemestre;
	}

	public void setObservacionesPrimerSemestre(String observacionesPrimerSemestre) {
		this.observacionesPrimerSemestre = observacionesPrimerSemestre;
	}

	public String getObservacionesSegundoSemestre() {
		return this.observacionesSegundoSemestre;
	}

	public void setObservacionesSegundoSemestre(String observacionesSegundoSemestre) {
		this.observacionesSegundoSemestre = observacionesSegundoSemestre;
	}

	public String getParticipaClases() {
		return this.participaClases;
	}

	public void setParticipaClases(String participaClases) {
		this.participaClases = participaClases;
	}

	public String getPositivoParticipativo() {
		return this.positivoParticipativo;
	}

	public void setPositivoParticipativo(String positivoParticipativo) {
		this.positivoParticipativo = positivoParticipativo;
	}

	public String getPreocupacionSolidaridad() {
		return this.preocupacionSolidaridad;
	}

	public void setPreocupacionSolidaridad(String preocupacionSolidaridad) {
		this.preocupacionSolidaridad = preocupacionSolidaridad;
	}

	public String getRespetaBienes() {
		return this.respetaBienes;
	}

	public void setRespetaBienes(String respetaBienes) {
		this.respetaBienes = respetaBienes;
	}

	public String getRespetaNormasConvivencia() {
		return this.respetaNormasConvivencia;
	}

	public void setRespetaNormasConvivencia(String respetaNormasConvivencia) {
		this.respetaNormasConvivencia = respetaNormasConvivencia;
	}

	public String getResponsableDeberes() {
		return this.responsableDeberes;
	}

	public void setResponsableDeberes(String responsableDeberes) {
		this.responsableDeberes = responsableDeberes;
	}

	public String getResuelveProblemasInterpersonales() {
		return this.resuelveProblemasInterpersonales;
	}

	public void setResuelveProblemasInterpersonales(String resuelveProblemasInterpersonales) {
		this.resuelveProblemasInterpersonales = resuelveProblemasInterpersonales;
	}

	public String getSuperaDificultades() {
		return this.superaDificultades;
	}

	public void setSuperaDificultades(String superaDificultades) {
		this.superaDificultades = superaDificultades;
	}

	public String getSuperaErrores() {
		return this.superaErrores;
	}

	public void setSuperaErrores(String superaErrores) {
		this.superaErrores = superaErrores;
	}

	public String getToleraFrustraciones() {
		return this.toleraFrustraciones;
	}

	public void setToleraFrustraciones(String toleraFrustraciones) {
		this.toleraFrustraciones = toleraFrustraciones;
	}

	public String getTrabajaClases() {
		return this.trabajaClases;
	}

	public void setTrabajaClases(String trabajaClases) {
		this.trabajaClases = trabajaClases;
	}

	public String getTrabajoContinuo() {
		return this.trabajoContinuo;
	}

	public void setTrabajoContinuo(String trabajoContinuo) {
		this.trabajoContinuo = trabajoContinuo;
	}

	public Alumno getAlumno() {
		return this.alumno;
	}

	public void setAlumno(Alumno alumno) {
		this.alumno = alumno;
	}

}