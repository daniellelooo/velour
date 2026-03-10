import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validar campos requeridos
    const { nombre, email, talla, coleccion } = body;
    
    if (!nombre || !email || !talla) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Validar talla
    const tallasValidas = ['XS', 'S', 'M', 'L', 'XL'];
    if (!tallasValidas.includes(talla)) {
      return NextResponse.json(
        { error: 'Talla inválida' },
        { status: 400 }
      );
    }

    // Preparar datos para n8n
    const dataParaN8n = {
      tipo: 'lista_espera_edit',
      nombre,
      email,
      talla,
      coleccion: coleccion || 'Edit #9 (Próxima)',
      timestamp: new Date().toISOString(),
      origen: 'web_velour_studio',
      metadata: {
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer')
      }
    };

    // Enviar a n8n webhook
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_LISTA_ESPERA;
    
    if (n8nWebhookUrl && n8nWebhookUrl !== 'TU_WEBHOOK_URL_AQUI') {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataParaN8n),
      });

      if (!response.ok) {
        console.error('Error al enviar a n8n:', response.statusText);
        // No retornamos error al usuario, seguimos con el flujo
      }
    }

    // Opcionalmente, también enviar notificación por email aquí
    // (si tienes configurado un servicio de email como SendGrid, Resend, etc.)

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      mensaje: 'Registro exitoso en lista de espera',
      data: {
        nombre,
        email,
        talla,
        coleccion
      }
    });

  } catch (error) {
    console.error('Error en /api/lista-espera:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Permitir CORS si es necesario
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
