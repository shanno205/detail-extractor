import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('=== PADDLE GET TRANSACTION API CALLED ===');
    
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');

    console.log('Requested transaction ID:', transactionId);

    // Validate input
    if (!transactionId) {
      console.log('❌ Missing transaction ID');
      return NextResponse.json(
        { success: false, message: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Validate transaction ID format (Paddle transaction IDs start with txn_)
    if (!transactionId.startsWith('txn_')) {
      console.log('❌ Invalid transaction ID format:', transactionId);
      return NextResponse.json(
        { success: false, message: 'Invalid transaction ID format. Transaction ID should start with "txn_"' },
        { status: 400 }
      );
    }

    // Check for Paddle API credentials
    if (!process.env.PADDLE_API_KEY) {
      console.log('❌ Missing Paddle API key');
      return NextResponse.json({
        success: false,
        error: 'Missing Paddle API key configuration'
      }, { status: 500 });
    }

    console.log('Making request to Paddle API...');

    // Paddle API endpoint for getting a specific transaction
    const paddleApiUrl = `https://api.paddle.com/transactions/${transactionId}`;

    const response = await fetch(paddleApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Paddle API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Paddle API error:', errorText);
      
      if (response.status === 404) {
        return NextResponse.json({
          success: false,
          message: 'Transaction not found',
          transactionId: transactionId
        }, { status: 404 });
      }
      
      if (response.status === 401) {
        return NextResponse.json({
          success: false,
          message: 'Unauthorized - Invalid API key'
        }, { status: 401 });
      }

      return NextResponse.json({
        success: false,
        message: 'Failed to fetch transaction from Paddle',
        error: errorText
      }, { status: response.status });
    }

    const transactionData = await response.json();
    console.log('✅ Transaction fetched successfully');

    // Extract useful information from the transaction
    const transaction = transactionData.data;
    
    const formattedTransaction = {
      id: transaction.id,
      status: transaction.status,
      amount: transaction.details?.totals?.grand_total || 'N/A',
      currency: transaction.currency_code,
      createdAt: transaction.created_at,
      updatedAt: transaction.updated_at,
      customerId: transaction.customer_id,
      subscriptionId: transaction.subscription_id || null,
      items: transaction.items?.map(item => ({
        priceId: item.price_id,
        quantity: item.quantity,
        description: item.price?.description || 'N/A'
      })) || [],
      billingDetails: transaction.billing_details || null,
      paymentMethod: transaction.payments?.[0]?.method_details?.type || 'N/A'
    };

    return NextResponse.json({ 
      success: true,
      message: 'Transaction retrieved successfully',
      transaction: formattedTransaction,
      rawData: transaction // Include raw data for debugging if needed
    });

  } catch (error) {
    console.error('❌ Error fetching transaction:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      message: 'Internal server error while fetching transaction'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    console.log('=== PADDLE GET TRANSACTION API CALLED (POST) ===');
    
    const { transactionId } = await request.json();

    console.log('Requested transaction ID:', transactionId);

    // Validate input
    if (!transactionId) {
      console.log('❌ Missing transaction ID');
      return NextResponse.json(
        { success: false, message: 'Transaction ID is required' },
        { status: 400 }
      );
    }

    // Validate transaction ID format (Paddle transaction IDs start with txn_)
    if (!transactionId.startsWith('txn_')) {
      console.log('❌ Invalid transaction ID format:', transactionId);
      return NextResponse.json(
        { success: false, message: 'Invalid transaction ID format. Transaction ID should start with "txn_"' },
        { status: 400 }
      );
    }

    // Check for Paddle API credentials
    if (!process.env.PADDLE_API_KEY) {
      console.log('❌ Missing Paddle API key');
      return NextResponse.json({
        success: false,
        error: 'Missing Paddle API key configuration'
      }, { status: 500 });
    }

    console.log('Making request to Paddle API...');

    // Paddle API endpoint for getting a specific transaction
    const paddleApiUrl = `https://api.paddle.com/transactions/${transactionId}`;

    const response = await fetch(paddleApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Paddle API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Paddle API error:', errorText);
      
      if (response.status === 404) {
        return NextResponse.json({
          success: false,
          message: 'Transaction not found',
          transactionId: transactionId
        }, { status: 404 });
      }
      
      if (response.status === 401) {
        return NextResponse.json({
          success: false,
          message: 'Unauthorized - Invalid API key'
        }, { status: 401 });
      }

      return NextResponse.json({
        success: false,
        message: 'Failed to fetch transaction from Paddle',
        error: errorText
      }, { status: response.status });
    }

    const transactionData = await response.json();
    console.log('✅ Transaction fetched successfully');

    // Extract useful information from the transaction
    const transaction = transactionData.data;
    
    const formattedTransaction = {
      id: transaction.id,
      status: transaction.status,
      amount: transaction.details?.totals?.grand_total || 'N/A',
      currency: transaction.currency_code,
      createdAt: transaction.created_at,
      updatedAt: transaction.updated_at,
      customerId: transaction.customer_id,
      subscriptionId: transaction.subscription_id || null,
      items: transaction.items?.map(item => ({
        priceId: item.price_id,
        quantity: item.quantity,
        description: item.price?.description || 'N/A'
      })) || [],
      billingDetails: transaction.billing_details || null,
      paymentMethod: transaction.payments?.[0]?.method_details?.type || 'N/A'
    };

    return NextResponse.json({ 
      success: true,
      message: 'Transaction retrieved successfully',
      transaction: formattedTransaction,
      rawData: transaction // Include raw data for debugging if needed
    });

  } catch (error) {
    console.error('❌ Error fetching transaction:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      message: 'Internal server error while fetching transaction'
    }, { status: 500 });
  }
}