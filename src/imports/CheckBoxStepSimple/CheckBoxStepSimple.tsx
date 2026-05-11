import svgPaths from "./svg-2b0r7g167w";
import imgGreyLoaderCircle1 from "./bef967901bf7dc274dfb8eeff29e290ffa7ee4db.png";

function FilaHeader() {
  return (
    <div className="content-stretch flex gap-[55px] items-center pb-[22px] relative shrink-0 w-full" data-name="fila-header">
      <div aria-hidden="true" className="absolute border-[#d2d2e1] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[140px]">
        <p className="leading-[20px]">Tipo</p>
      </div>
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[140px]">
        <p className="leading-[20px]">Estado</p>
      </div>
      <div className="flex flex-col font-['Poppins:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[140px]">
        <p className="leading-[20px]">Diseño</p>
      </div>
    </div>
  );
}

function EstadoName() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140px]" data-name="estado-name">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[10px] w-[140px]">
        <p className="leading-[20px]">Activo</p>
      </div>
    </div>
  );
}

function CeldaEstadoXDiseno5() {
  return (
    <div className="content-stretch flex gap-[55px] items-center relative shrink-0 w-full" data-name="celda_estado_x_diseño 03">
      <EstadoName />
      <div className="bg-[#c22339] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[24px]" data-name="Check-crcle">
        <div className="h-[8.167px] relative shrink-0 w-[11.084px]" data-name="Vector (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0839 8.16662">
            <path d={svgPaths.p3f454380} fill="var(--fill-0, white)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function EstadoName1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140px]" data-name="estado-name">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[10px] w-[140px]">
        <p className="leading-[20px]">Pasivo</p>
      </div>
    </div>
  );
}

function CeldaEstadoXDiseno4() {
  return (
    <div className="content-stretch flex gap-[55px] items-end relative shrink-0 w-full" data-name="celda_estado_x_diseño 02">
      <EstadoName1 />
      <div className="relative shrink-0 size-[24px]" data-name="Check-crcle">
        <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid inset-0 rounded-[9999px]" data-name="Background+Border" />
      </div>
    </div>
  );
}

function EstadoName2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140px]" data-name="estado-name">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[10px] w-[140px]">
        <p className="leading-[20px]">Cargando</p>
      </div>
    </div>
  );
}

function CeldaEstadoXDiseno3() {
  return (
    <div className="content-stretch flex gap-[55px] items-center relative shrink-0 w-full" data-name="celda_estado_x_diseño 01">
      <EstadoName2 />
      <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[24px]" data-name="Check-crcle">
        <div className="relative shrink-0 size-[20px]" data-name="grey loader circle 1">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgGreyLoaderCircle1} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18.7px] left-[calc(50%+0.02px)] mix-blend-color top-[calc(50%-0.15px)] w-[18.767px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7668 18.7">
            <g id="Ellipse 1190" style={{ mixBlendMode: "color" }}>
              <path d={svgPaths.pf91cf00} fill="var(--fill-0, #C22339)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function CeldaEstados() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[219px]" data-name="celda-estados">
      <CeldaEstadoXDiseno5 />
      <CeldaEstadoXDiseno4 />
      <CeldaEstadoXDiseno3 />
    </div>
  );
}

function Fila() {
  return (
    <div className="content-stretch flex gap-[55px] items-start relative shrink-0" data-name="fila">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[140px]">
        <p className="leading-[20px]">Circulares</p>
      </div>
      <CeldaEstados />
    </div>
  );
}

function EstadoName3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140px]" data-name="estado-name">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[10px] w-[140px]">
        <p className="leading-[20px]">Activo</p>
      </div>
    </div>
  );
}

function CeldaEstadoXDiseno2() {
  return (
    <div className="content-stretch flex gap-[55px] items-center relative shrink-0 w-full" data-name="celda_estado_x_diseño 03">
      <EstadoName3 />
      <div className="bg-[#c22339] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[24px]" data-name="Check-crcle">
        <div className="h-[8.167px] relative shrink-0 w-[11.084px]" data-name="Vector (Stroke)">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0839 8.16662">
            <path d={svgPaths.p3f454380} fill="var(--fill-0, white)" id="Vector (Stroke)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function EstadoName4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140px]" data-name="estado-name">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[10px] w-[140px]">
        <p className="leading-[20px]">Pasivo</p>
      </div>
    </div>
  );
}

function CeldaEstadoXDiseno1() {
  return (
    <div className="content-stretch flex gap-[55px] items-end relative shrink-0 w-full" data-name="celda_estado_x_diseño 02">
      <EstadoName4 />
      <div className="relative shrink-0 size-[24px]" data-name="Check-crcle">
        <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid inset-0 rounded-[8px]" data-name="Background+Border" />
      </div>
    </div>
  );
}

function EstadoName5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140px]" data-name="estado-name">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[10px] w-[140px]">
        <p className="leading-[20px]">Cargando</p>
      </div>
    </div>
  );
}

function CeldaEstadoXDiseno() {
  return (
    <div className="content-stretch flex gap-[55px] items-center relative shrink-0 w-full" data-name="celda_estado_x_diseño 01">
      <EstadoName5 />
      <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[24px]" data-name="Check-crcle">
        <div className="relative shrink-0 size-[20px]" data-name="grey loader circle 1">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={imgGreyLoaderCircle1} />
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[18.7px] left-[calc(50%+0.02px)] mix-blend-color top-[calc(50%-0.15px)] w-[18.767px]">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7668 18.7">
            <g id="Ellipse 1190" style={{ mixBlendMode: "color" }}>
              <path d={svgPaths.pf91cf00} fill="var(--fill-0, #C22339)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function CeldaEstados1() {
  return (
    <div className="content-stretch flex flex-col gap-[22px] items-start relative shrink-0 w-[219px]" data-name="celda-estados">
      <CeldaEstadoXDiseno2 />
      <CeldaEstadoXDiseno1 />
      <CeldaEstadoXDiseno />
    </div>
  );
}

function Fila1() {
  return (
    <div className="content-stretch flex gap-[55px] items-start relative shrink-0" data-name="fila">
      <div className="flex flex-col font-['Poppins:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[140px]">
        <p className="leading-[20px]">Cuadrados</p>
      </div>
      <CeldaEstados1 />
    </div>
  );
}

function TablaDatosDeComponente() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0" data-name="tabla-datos de componente">
      <FilaHeader />
      <Fila />
      <Fila1 />
    </div>
  );
}

export default function CheckBoxStepSimple() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[55px] relative size-full" data-name="Check-box / Step simple">
      <TablaDatosDeComponente />
    </div>
  );
}