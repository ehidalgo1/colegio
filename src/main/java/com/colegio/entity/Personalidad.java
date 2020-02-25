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
	
	@Column(name="HIGIENE_PRESENTACION")
	private String higienePresentacion;
	
	@Column(name="AUTOESTIMA_VALORACION")
	private String autoestimaValoracion;
	
	@Column(name="SUPERA_ERRORES")
	private String superaErrores;

	@Column(name="TOLERA_FRUSTRACIONES")
	private String toleraFrustraciones;
	
	@Column(name="CONTROLA_IMPULSOS")
	private String controlaImpulsos;
	

	@Column(name="INTEGRA_GRUPO")
	private String integraGrupo;
	
	@Column(name="RESUELVE_PROBLEMAS_INTERPERSONALES")
	private String resuelveProblemasInterpersonales;
	
	@Column(name="RESPETA_NORMAS_CONVIVENCIA")
	private String respetaNormasConvivencia;
	
	@Column(name="ACTITUD_RESPETUOSA")
	private String actitudRespetuosa;
	
	@Column(name="PREOCUPACION_SOLIDARIDAD")
	private String preocupacionSolidaridad;
	
	
	@Column(name="RESPETA_BIENES")
	private String respetaBienes;
	
	
	@Column(name="TRABAJO_CONTINUO")
	private String trabajoContinuo;
	
	@Column(name="RESPONSABLE_DEBERES")
	private String responsableDeberes;
	
	@Column(name="PARTICIPA_CLASES")
	private String participaClases;
	

	@Column(name="DEMUESTRA_EMPRENDIMIENTO")
	private String demuestraEmprendimiento;
	

	@Column(name="INTERCAMBIA_CONOCIMIENTOS")
	private String intercambiaConocimientos;

	@Column(name="SUPERA_DIFICULTADES")
	private String superaDificultades;

	@Column(name="TRABAJA_CLASES")
	private String trabajaClases;
	
	@Column(name="ACATA_NORMAS")
	private String acataNormas;
	
	
	@Column(name="DISPUESTO_CONCENTRADO")
	private String dispuestoConcentrado;

	@Column(name="POSITIVO_PARTICIPATIVO")
	private String positivoParticipativo;

	@Lob
	@Column(name="OBSERVACIONES")
	private String observaciones;
	



	//uni-directional many-to-one association to Alumno
	@ManyToOne
	private Alumno alumno;
	
	@ManyToOne
	private Semestre semestre;

	public Personalidad() {
		
	}

	public Personalidad(Long idPersonalidad, String higienePresentacion, String autoestimaValoracion,
			String superaErrores, String toleraFrustraciones, String controlaImpulsos, String integraGrupo,
			String resuelveProblemasInterpersonales, String respetaNormasConvivencia, String actitudRespetuosa,
			String preocupacionSolidaridad, String respetaBienes, String trabajoContinuo, String responsableDeberes,
			String participaClases, String demuestraEmprendimiento, String intercambiaConocimientos,
			String superaDificultades, String trabajaClases, String acataNormas, String dispuestoConcentrado,
			String positivoParticipativo, String observaciones, Alumno alumno, Semestre semestre) {
		super();
		this.idPersonalidad = idPersonalidad;
		this.higienePresentacion = higienePresentacion;
		this.autoestimaValoracion = autoestimaValoracion;
		this.superaErrores = superaErrores;
		this.toleraFrustraciones = toleraFrustraciones;
		this.controlaImpulsos = controlaImpulsos;
		this.integraGrupo = integraGrupo;
		this.resuelveProblemasInterpersonales = resuelveProblemasInterpersonales;
		this.respetaNormasConvivencia = respetaNormasConvivencia;
		this.actitudRespetuosa = actitudRespetuosa;
		this.preocupacionSolidaridad = preocupacionSolidaridad;
		this.respetaBienes = respetaBienes;
		this.trabajoContinuo = trabajoContinuo;
		this.responsableDeberes = responsableDeberes;
		this.participaClases = participaClases;
		this.demuestraEmprendimiento = demuestraEmprendimiento;
		this.intercambiaConocimientos = intercambiaConocimientos;
		this.superaDificultades = superaDificultades;
		this.trabajaClases = trabajaClases;
		this.acataNormas = acataNormas;
		this.dispuestoConcentrado = dispuestoConcentrado;
		this.positivoParticipativo = positivoParticipativo;
		this.observaciones = observaciones;
		this.alumno = alumno;
		this.semestre = semestre;
	}



	public Long getIdPersonalidad() {
		return idPersonalidad;
	}

	public void setIdPersonalidad(Long idPersonalidad) {
		this.idPersonalidad = idPersonalidad;
	}

	public String getHigienePresentacion() {
		return higienePresentacion;
	}

	public void setHigienePresentacion(String higienePresentacion) {
		this.higienePresentacion = higienePresentacion;
	}

	public String getAutoestimaValoracion() {
		return autoestimaValoracion;
	}

	public void setAutoestimaValoracion(String autoestimaValoracion) {
		this.autoestimaValoracion = autoestimaValoracion;
	}

	public String getSuperaErrores() {
		return superaErrores;
	}

	public void setSuperaErrores(String superaErrores) {
		this.superaErrores = superaErrores;
	}

	public String getToleraFrustraciones() {
		return toleraFrustraciones;
	}

	public void setToleraFrustraciones(String toleraFrustraciones) {
		this.toleraFrustraciones = toleraFrustraciones;
	}

	public String getControlaImpulsos() {
		return controlaImpulsos;
	}

	public void setControlaImpulsos(String controlaImpulsos) {
		this.controlaImpulsos = controlaImpulsos;
	}

	public String getIntegraGrupo() {
		return integraGrupo;
	}

	public void setIntegraGrupo(String integraGrupo) {
		this.integraGrupo = integraGrupo;
	}

	public String getResuelveProblemasInterpersonales() {
		return resuelveProblemasInterpersonales;
	}

	public void setResuelveProblemasInterpersonales(String resuelveProblemasInterpersonales) {
		this.resuelveProblemasInterpersonales = resuelveProblemasInterpersonales;
	}

	public String getRespetaNormasConvivencia() {
		return respetaNormasConvivencia;
	}

	public void setRespetaNormasConvivencia(String respetaNormasConvivencia) {
		this.respetaNormasConvivencia = respetaNormasConvivencia;
	}

	public String getActitudRespetuosa() {
		return actitudRespetuosa;
	}

	public void setActitudRespetuosa(String actitudRespetuosa) {
		this.actitudRespetuosa = actitudRespetuosa;
	}

	public String getPreocupacionSolidaridad() {
		return preocupacionSolidaridad;
	}

	public void setPreocupacionSolidaridad(String preocupacionSolidaridad) {
		this.preocupacionSolidaridad = preocupacionSolidaridad;
	}

	public String getRespetaBienes() {
		return respetaBienes;
	}

	public void setRespetaBienes(String respetaBienes) {
		this.respetaBienes = respetaBienes;
	}

	public String getTrabajoContinuo() {
		return trabajoContinuo;
	}

	public void setTrabajoContinuo(String trabajoContinuo) {
		this.trabajoContinuo = trabajoContinuo;
	}

	public String getResponsableDeberes() {
		return responsableDeberes;
	}

	public void setResponsableDeberes(String responsableDeberes) {
		this.responsableDeberes = responsableDeberes;
	}

	public String getParticipaClases() {
		return participaClases;
	}

	public void setParticipaClases(String participaClases) {
		this.participaClases = participaClases;
	}

	public String getDemuestraEmprendimiento() {
		return demuestraEmprendimiento;
	}

	public void setDemuestraEmprendimiento(String demuestraEmprendimiento) {
		this.demuestraEmprendimiento = demuestraEmprendimiento;
	}

	public String getIntercambiaConocimientos() {
		return intercambiaConocimientos;
	}

	public void setIntercambiaConocimientos(String intercambiaConocimientos) {
		this.intercambiaConocimientos = intercambiaConocimientos;
	}

	public String getSuperaDificultades() {
		return superaDificultades;
	}

	public void setSuperaDificultades(String superaDificultades) {
		this.superaDificultades = superaDificultades;
	}

	public String getTrabajaClases() {
		return trabajaClases;
	}

	public void setTrabajaClases(String trabajaClases) {
		this.trabajaClases = trabajaClases;
	}

	public String getAcataNormas() {
		return acataNormas;
	}

	public void setAcataNormas(String acataNormas) {
		this.acataNormas = acataNormas;
	}

	public String getDispuestoConcentrado() {
		return dispuestoConcentrado;
	}

	public void setDispuestoConcentrado(String dispuestoConcentrado) {
		this.dispuestoConcentrado = dispuestoConcentrado;
	}

	public String getPositivoParticipativo() {
		return positivoParticipativo;
	}

	public void setPositivoParticipativo(String positivoParticipativo) {
		this.positivoParticipativo = positivoParticipativo;
	}

	public String getObservaciones() {
		return observaciones;
	}

	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}

	public Alumno getAlumno() {
		return alumno;
	}

	public void setAlumno(Alumno alumno) {
		this.alumno = alumno;
	}

	public Semestre getSemestre() {
		return semestre;
	}

	public void setSemestre(Semestre semestre) {
		this.semestre = semestre;
	}

	 
	
	
	
}